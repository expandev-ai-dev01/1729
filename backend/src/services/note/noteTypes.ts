/**
 * @summary
 * Type definitions for note service
 *
 * @module services/note/noteTypes
 *
 * @description
 * Defines interfaces and types for note-related operations
 */

/**
 * @interface NoteCreateParams
 * @description Parameters required to create a new note
 *
 * @property {number} idAccount - Account identifier for multi-tenancy
 * @property {number} idUser - User identifier from authenticated session
 * @property {string} title - Note title (max 255 characters)
 * @property {string} content - Note content (supports text formatting)
 */
export interface NoteCreateParams {
  idAccount: number;
  idUser: number;
  title: string;
  content: string;
}

/**
 * @interface NoteCreateResult
 * @description Result of note creation operation
 *
 * @property {number} idNote - Created note identifier
 */
export interface NoteCreateResult {
  idNote: number;
}

/**
 * @interface NoteEntity
 * @description Complete note entity representation
 *
 * @property {number} idNote - Unique note identifier
 * @property {number} idAccount - Associated account identifier
 * @property {number} idUser - User who created the note
 * @property {string} title - Note title
 * @property {string} content - Note content
 * @property {Date} dateCreated - Creation timestamp
 * @property {Date} dateModified - Last modification timestamp
 * @property {boolean} deleted - Soft delete flag
 */
export interface NoteEntity {
  idNote: number;
  idAccount: number;
  idUser: number;
  title: string;
  content: string;
  dateCreated: Date;
  dateModified: Date;
  deleted: boolean;
}
