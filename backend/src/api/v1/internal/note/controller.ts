/**
 * @summary
 * Note creation controller handling HTTP POST requests
 *
 * @module api/v1/internal/note/controller
 *
 * @description
 * Handles note creation with validation, authentication, and database persistence
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { StatusGeneralError } from '@/middleware/error';
import { noteCreate } from '@/services/note';

/**
 * @api {post} /api/v1/internal/note Create Note
 * @apiName CreateNote
 * @apiGroup Note
 * @apiVersion 1.0.0
 *
 * @apiDescription Creates a new note with title and content
 *
 * @apiParam {String} title Note title (max 255 characters)
 * @apiParam {String} content Note content
 *
 * @apiSuccess {Number} idNote Created note identifier
 *
 * @apiError {String} titleRequired Title is required
 * @apiError {String} titleExceedsMaxLength Title exceeds 255 characters
 * @apiError {String} contentRequired Content is required
 * @apiError {String} userNotFound User not authenticated or not found
 */

const bodySchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1),
});

export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    /**
     * @validation Request body validation
     */
    const validationResult = bodySchema.safeParse(req.body);

    if (!validationResult.success) {
      res
        .status(400)
        .json(
          errorResponse('Validation failed', 'VALIDATION_ERROR', validationResult.error.errors)
        );
      return;
    }

    const { title, content } = validationResult.data;

    /**
     * @validation Authentication check
     * @remarks In production, extract from JWT token or session
     */
    const idAccount = 1; // TODO: Extract from authenticated session
    const idUser = 1; // TODO: Extract from authenticated session

    if (!idAccount || !idUser) {
      res.status(401).json(errorResponse('Authentication required', 'UNAUTHORIZED'));
      return;
    }

    /**
     * @rule {fn-note-creation} Create note with validated data
     */
    const result = await noteCreate({
      idAccount,
      idUser,
      title,
      content,
    });

    res.status(201).json(successResponse(result));
  } catch (error: any) {
    /**
     * @remarks Handle specific database errors
     */
    if (error.number === 51000) {
      res.status(400).json(errorResponse(error.message, 'BUSINESS_RULE_ERROR'));
    } else {
      next(StatusGeneralError);
    }
  }
}
