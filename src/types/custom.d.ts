declare namespace Express {
	export interface Request {
		user:
			| string
			| {
					[p: string]: any;
					iss?: string | undefined;
					sub?: string | undefined;
					aud?: string | string[] | undefined;
					exp?: number | undefined;
					nbf?: number | undefined;
					iat?: number | undefined;
					jti?: string | undefined;
			  };
	}
}
