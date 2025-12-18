import { Mistral } from '@mistralai/mistralai';

import { HTTP_STATUS } from '../../../config/http.config';
import { ErrorCode } from '../../../enums/error-code.enum';
import { InternalServerError } from '../../../errors/internal-server.error';
import { AppError } from '../../../errors/app.error';

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
	async fetch(request, env, ctx): Promise<Response> {
		if (request.method == 'OPTIONS') {
			return new Response(null, {
				headers: corsHeaders,
			});
		}

		if (request.method !== 'POST') {
			return new Response(JSON.stringify({ error: `${request.method} method not allowed.` }), { status: 405, headers: corsHeaders });
		}

		const mistral = new Mistral({
			apiKey: env.MISTRAL_AI_API_KEY,
			serverURL: env.MISTRAL_SERVER_URL,
		});

		try {
			const messages = (await request.json()) as any;
			console.log('Messages', messages);
			const response = await mistral.chat.complete({
				model: 'mistral-large-latest',
				messages,
			});

			if (!response) {
				throw new InternalServerError('Error generating report', HTTP_STATUS.INTERNAL_SERVER_ERROR, ErrorCode.INTERNAL_SERVER_ERROR);
			}

			return new Response(JSON.stringify(response.choices[0].message), {
				headers: corsHeaders,
				status: HTTP_STATUS.OK,
			});
		} catch (error) {
			if (error instanceof Error) {
				return new Response(JSON.stringify({ error: error.message }), {
					headers: corsHeaders,
					status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
				});
			}

			if (error instanceof AppError) {
				return new Response(JSON.stringify({ error: error.message }), {
					headers: corsHeaders,
					status: error.statusCode,
				});
			}

			return new Response(JSON.stringify({ error: error }), {
				headers: corsHeaders,
				status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
			});
		}
	},
} satisfies ExportedHandler<Env>;
