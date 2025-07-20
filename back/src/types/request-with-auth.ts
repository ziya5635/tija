import { Request } from 'express';

export interface RequestWithAuth extends Request {
    headers: {
        authorization?: string;
    } & Request['headers']; // Merge with existing headers
}