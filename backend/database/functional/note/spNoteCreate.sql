/**
 * @summary
 * Creates a new note with title and content, automatically generating
 * ID, creation timestamp, and associating with the authenticated user.
 *
 * @procedure spNoteCreate
 * @schema functional
 * @type stored-procedure
 *
 * @endpoints
 * - POST /api/v1/internal/note
 *
 * @parameters
 * @param {INT} idAccount
 *   - Required: Yes
 *   - Description: Account identifier for multi-tenancy
 *
 * @param {INT} idUser
 *   - Required: Yes
 *   - Description: User identifier from authenticated session
 *
 * @param {NVARCHAR(255)} title
 *   - Required: Yes
 *   - Description: Note title (max 255 characters)
 *
 * @param {NVARCHAR(MAX)} content
 *   - Required: Yes
 *   - Description: Note content (supports text formatting)
 *
 * @returns {INT} idNote - Created note identifier
 *
 * @testScenarios
 * - Valid creation with all required parameters
 * - Title validation (empty, exceeds 255 characters)
 * - Content validation (empty)
 * - User authentication validation
 * - Account isolation verification
 */
CREATE OR ALTER PROCEDURE [functional].[spNoteCreate]
  @idAccount INTEGER,
  @idUser INTEGER,
  @title NVARCHAR(255),
  @content NVARCHAR(MAX)
AS
BEGIN
  SET NOCOUNT ON;

  /**
   * @validation Required parameter validation
   * @throw {titleRequired}
   */
  IF @title IS NULL OR LTRIM(RTRIM(@title)) = ''
  BEGIN
    ;THROW 51000, 'titleRequired', 1;
  END;

  /**
   * @validation Title length validation
   * @throw {titleExceedsMaxLength}
   */
  IF LEN(@title) > 255
  BEGIN
    ;THROW 51000, 'titleExceedsMaxLength', 1;
  END;

  /**
   * @validation Required parameter validation
   * @throw {contentRequired}
   */
  IF @content IS NULL OR LTRIM(RTRIM(@content)) = ''
  BEGIN
    ;THROW 51000, 'contentRequired', 1;
  END;

  /**
   * @validation Account parameter validation
   * @throw {accountRequired}
   */
  IF @idAccount IS NULL
  BEGIN
    ;THROW 51000, 'accountRequired', 1;
  END;

  /**
   * @validation User parameter validation
   * @throw {userRequired}
   */
  IF @idUser IS NULL
  BEGIN
    ;THROW 51000, 'userRequired', 1;
  END;

  /**
   * @validation User existence and account association
   * @throw {userNotFound}
   */
  IF NOT EXISTS (
    SELECT 1
    FROM [security].[user] [usr]
    WHERE [usr].[idUser] = @idUser
      AND [usr].[idAccount] = @idAccount
      AND [usr].[deleted] = 0
  )
  BEGIN
    ;THROW 51000, 'userNotFound', 1;
  END;

  BEGIN TRY
    /**
     * @rule {db-multi-tenancy,fn-note-creation} Insert new note with automatic timestamp generation
     */
    BEGIN TRAN;

      DECLARE @currentDateTime DATETIME2 = GETUTCDATE();
      DECLARE @idNote INTEGER;

      INSERT INTO [functional].[note] (
        [idAccount],
        [idUser],
        [title],
        [content],
        [dateCreated],
        [dateModified],
        [deleted]
      )
      VALUES (
        @idAccount,
        @idUser,
        @title,
        @content,
        @currentDateTime,
        @currentDateTime,
        0
      );

      SET @idNote = SCOPE_IDENTITY();

      /**
       * @output {NoteCreated, 1, 1}
       * @column {INT} idNote
       * - Description: Created note identifier
       */
      SELECT @idNote AS [idNote];

    COMMIT TRAN;
  END TRY
  BEGIN CATCH
    ROLLBACK TRAN;
    THROW;
  END CATCH;
END;
GO