import axios from 'axios';

import { HTTP_STATUS } from '../../../config/http.config';
import { BadRequestExceptionError } from '../../../errors/bad-request.error';
import { ErrorCode } from '../../../enums/error-code.enum';
import { AppError } from '../../../errors/app.error';

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
	async fetch(request, env, ctx): Promise<Response> {
		if (request.method === 'OPTIONS') {
			return new Response(null, { headers: corsHeaders });
		}

		const url = new URL(request.url);
		const ticker = url.searchParams.get('ticker');
		const startDate = url.searchParams.get('startDate');
		const endDate = url.searchParams.get('endDate');

		if (!ticker || !startDate || !endDate) {
			throw new BadRequestExceptionError(
				'Ticker, startDate, and endDate are required',
				HTTP_STATUS.BAD_REQUEST,
				ErrorCode.RESOURCE_NOT_FOUND
			);
		}

		try {
			const response = await fetch(`${env.POLYGON_BASE_URL}/${ticker}/range/1/day/${startDate}/${endDate}?apiKey=${env.POLYGON_API_KEY}`);
			const status = response.ok;
			if (!status) {
				throw new BadRequestExceptionError('Polygon API: Error fetching stock data', HTTP_STATUS.BAD_REQUEST, ErrorCode.RESOURCE_NOT_FOUND);
			}
			const data = (await response.json()) as any;
			delete data.request_id;

			return new Response(JSON.stringify(data), { headers: corsHeaders, status: HTTP_STATUS.OK });
		} catch (error) {
			if (error instanceof Error) {
				return new Response(error.message, { status: HTTP_STATUS.INTERNAL_SERVER_ERROR });
			}

			if (error instanceof AppError) {
				return new Response(error.message, { status: error.statusCode });
			}

			return new Response('Internal Server Error', { status: HTTP_STATUS.INTERNAL_SERVER_ERROR });
		}
	},
} satisfies ExportedHandler<Env>;
