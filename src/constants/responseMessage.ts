export const message = {
  // Authorization header

  UNAUTHORIZED: 'Unauthorized. Please login',
  PASSWORD_MISMATCH: ' Passwords do not match',
  INVALID_LOGIN: 'Invalid email or password , role is required',
  LOGIN_SUCCESS: 'Login successful',
  INVALID_TOKEN: 'Invalid token',
  TOKEN_EXPIRED: 'Token expired',

  // Admin

  SUPER_ADMIN_CREATED: 'Super Admin created',
  SUPER_ADMIN_EXISTS: 'Super Admin already exists',
  PHONE_NUMBER_ALREADY_EXISTS: 'Phone number exists',
  EMAIL_REQUIRED: 'Email required',
  SUPER_ADMIN_UPDATED_SUCCESSFULLY: 'Super Admin updated successfully',
  CONFIRM_PASSWORD: 'Confirm Password',
  PASSWORD_REQUIRED: 'Password required',
  SUPER_ADMIN_NOT_FOUND: 'Super Admin not found',
  SUPER_ADMINS_FETCHED_SUCCESSFULLY: 'Super Admin fetched successfully',
  SUPER_ADMIN_DELETED: 'Super Admin deleted',
  SUPER_ADMIN_STATUS_UPDATED: 'Super Admin status updated',
  EMAIL_EXISTS: 'Email exists',
  FAILED_TO_UPDATE_SUPER_ADMIN: 'Failed to update Super Admin',

  // lookup code

  UNAUTHORIZED_LOOKUP_CODE: 'Unauthorized.',
  LOOKUP_CODE_CREATED_SUCCESS: 'Lookup code created successfully.',
  LOOKUP_CODE_NOT_FOUND: 'Lookup code not found.',
  FAILED_TO_RETRIEVE_LOOKUP_CODES: 'Failed to retrieve lookup codes.',
  LOOKUP_CODE_UPDATED_SUCCESS: 'Lookup code updated successfully.',
  LOOKUP_CODE_DELETED_SUCCESS: 'Lookup code deleted successfully.',
  LOOKUP_CODE_DELETED: 'Lookup code deleted successfully.',
  LOOKUP_CODE_STATUS_UPDATED: 'Lookup code status updated successfully.',
  LOOKUP_CODE_ALREADY_EXISTS:
    'A LookupCode with the same type, name, or code already exists.',
  INTERNAL_SERVER_ERROR_LOOKUP_CODE: 'Internal server error.',

  //Customer type
  CUSTOMER_TYPE_CREATED_SUCCESS: 'Customer type created successfully',
  CUSTOMER_TYPE_UPDATED_SUCCESS: 'Customer type updated successfully',
  CUSTOMER_TYPE_DELETED: 'Customer type deleted successfully',
  CUSTOMER_TYPE_NOT_FOUND: 'Customer type not found',
  CUSTOMER_TYPE_STATUS_UPDATED: 'Customer type status updated successfully',
  FAILED_TO_RETRIEVE_CUSTOMER_TYPES: 'Failed to retrieve customer types',
  CUSTOMER_TYPE_EXISTS: 'Customer type with same exists',

  // Company Owner
  COMPANY_OWNER_CREATED_SUCCESS: 'Company owner created successfully',
  COMPANY_OWNER_UPDATED_SUCCESS: 'Company owner updated successfully',
  COMPANY_OWNER_DELETED: 'Company owner deleted successfully',
  COMPANY_OWNER_NOT_FOUND: 'Company owner not found',
  COMPANY_OWNER_STATUS_UPDATED: 'Company owner status updated successfully',
  FAILED_TO_RETRIEVE_COMPANY_OWNERS: 'Failed to retrieve company owners',
  COMPANY_OWNER_EXISTS: 'Company owner with same exists',

  // Team Manager
  TEAM_MANAGER_CREATED_SUCCESS: 'Team manager created successfully',
  TEAM_MANAGER_UPDATED_SUCCESS: 'Team manager updated successfully',
  TEAM_MANAGER_DELETED: 'Team manager deleted successfully',
  TEAM_MANAGER_NOT_FOUND: 'Team manager not found',
  TEAM_MANAGER_STATUS_UPDATED: 'Team manager status updated successfully',
  FAILED_TO_RETRIEVE_TEAM_MANAGERS: 'Failed to retrieve team managers',
  TEAM_MANAGER_EXISTS: 'Team manager with same exists',

  // Team Member
  TEAM_MEMBER_CREATED_SUCCESS: 'Team member created successfully',
  TEAM_MEMBER_UPDATED_SUCCESS: 'Team member updated successfully',
  TEAM_MEMBER_DELETED: 'Team member deleted successfully',
  TEAM_MEMBER_NOT_FOUND: 'Team member not found',
  TEAM_MEMBER_STATUS_UPDATED: 'Team member status updated successfully',
  FAILED_TO_RETRIEVE_TEAM_MEMBERS: 'Failed to retrieve team members',
  TEAM_MEMBER_EXISTS: 'Team member with same exists',

  // industry Projects
  INDUSTRY_PROJECT_CREATED_SUCCESS: 'Industry project created successfully',
  INDUSTRY_PROJECT_UPDATED_SUCCESS: 'Industry project updated successfully',
  INDUSTRY_PROJECT_DELETED: 'Industry project deleted successfully',
  INDUSTRY_PROJECT_NOT_FOUND: 'Industry project not found',
  INDUSTRY_PROJECT_STATUS_UPDATED:
    'Industry project status updated successfully',
  FAILED_TO_RETRIEVE_INDUSTRY_PROJECTS: 'Failed to retrieve industry projects',
  INDUSTRY_PROJECT_EXISTS: 'Industry project with same exists',

  // task roles
  TASK_ROLE_CREATED_SUCCESS: 'Task role created successfully',
  TASK_ROLE_UPDATED_SUCCESS: 'Task role updated successfully',
  TASK_ROLE_DELETED: 'Task role deleted successfully',
  TASK_ROLE_NOT_FOUND: 'Task role not found',
  TASK_ROLE_STATUS_UPDATED: 'Task role status updated successfully',
  FAILED_TO_RETRIEVE_TASK_ROLES: 'Failed to retrieve task roles',
  TASK_ROLE_EXISTS: 'Task role with same exists',

  // todo list
  TODO_LIST_CREATED_SUCCESS: 'Todo list created successfully',
  TODO_LIST_UPDATED_SUCCESS: 'Todo list updated successfully',
  TODO_LIST_DELETED: 'Todo list deleted successfully',
  TODO_LIST_NOT_FOUND: 'Todo list not found',
  TODO_LIST_STATUS_UPDATED: 'Todo list status updated successfully',
  FAILED_TO_RETRIEVE_TODO_LISTS: 'Failed to retrieve todo lists',
  TODO_LIST_EXISTS: 'Todo list with same exists',

  // Alert Modes
  // Success Messages
  ALERT_MODE_CREATED_SUCCESS: 'Alert mode created successfully.',
  ALERT_MODE_UPDATED_SUCCESS: 'Alert mode updated successfully.',
  ALERT_MODE_DELETED: 'Alert mode deleted successfully.',
  ALERT_MODES_FETCHED_SUCCESS: 'Alert modes fetched successfully.',
  ALERT_MODE_FETCHED_SUCCESS: 'Alert mode fetched successfully.',
  ALERT_MODE_STATUS_UPDATED: 'Alert mode status updated successfully.',

  // Error Messages
  UNAUTHORIZED_: 'Unauthorized access. Please log in.',
  ALERT_MODE_NOT_FOUND: 'Alert mode not found.',
  ALERT_MODE_CODE_EXISTS: 'An alert mode with the same code already exists.',
  ALERT_MODE_MESSAGE_EXISTS:
    'An alert mode with the same message already exists.',
  ALERT_MODE_CODE_REQUIRED: 'Alert mode code is required.',
  ALERT_MODE_MESSAGE_REQUIRED: 'Alert mode message is required.',
  ALERT_MODE_SEVERITY_REQUIRED: 'Alert mode severity is required.',
  ALERT_MODE_CUSTOMER_REQUIRED: 'Alert mode customer is required.',
  ALERT_MODE_TRIGGERED_AT_REQUIRED: 'Alert mode triggered date is required.',
  ALERT_MODE_STATUS_REQUIRED: 'Alert mode status is required.',
  ALERT_MODE_UPDATE_FAILED: 'Failed to update alert mode.',
  ALERT_MODE_DELETE_FAILED: 'Failed to delete alert mode.',
  ALERT_MODE_FETCH_FAILED: 'Failed to fetch alert mode.',
  ALERT_MODE_CREATE_FAILED: 'Failed to create alert mode.',

  // client feedback messages

  // General messages
  UNAUTHORIZED_FEEDBACK: 'Unauthorized access. Please log in.',
  INTERNAL_SERVER_ERROR: 'Internal server error. Please try again later.',

  // Client Feedback messages
  CLIENT_FEEDBACK_CREATED_SUCCESS: 'Client feedback created successfully.',
  CLIENT_FEEDBACK_UPDATED_SUCCESS: 'Client feedback updated successfully.',
  CLIENT_FEEDBACK_DELETED: 'Client feedback deleted successfully.',
  CLIENT_FEEDBACKS_FETCHED_SUCCESS: 'Client feedbacks fetched successfully.',
  CLIENT_FEEDBACK_FETCHED_SUCCESS: 'Client feedback fetched successfully.',
  CLIENT_FEEDBACK_STATUS_UPDATED:
    'Client feedback status updated successfully.',
  CLIENT_FEEDBACK_NOT_FOUND: 'Client feedback not found.',
  CLIENT_FEEDBACK_CODE_EXISTS:
    'A client feedback with the same code already exists.',

  // Validation messages
  CLIENT_FEEDBACK_CODE_REQUIRED: 'Client feedback code is required.',
  CLIENT_FEEDBACK_COMMENT_REQUIRED: 'Client feedback comment is required.',
  CLIENT_FEEDBACK_RATING_REQUIRED: 'Client feedback rating is required.',
  CLIENT_FEEDBACK_CUSTOMER_REQUIRED: 'Customer is required.',
  CLIENT_FEEDBACK_PROJECT_REQUIRED: 'Industry project is required.',

  // Error messages
  CLIENT_FEEDBACK_CREATE_ERROR: 'Error creating client feedback.',
  CLIENT_FEEDBACK_UPDATE_ERROR: 'Error updating client feedback.',
  CLIENT_FEEDBACK_DELETE_ERROR: 'Error deleting client feedback.',
  CLIENT_FEEDBACK_FETCH_ERROR: 'Error fetching client feedback.',
  CLIENT_FEEDBACK_STATUS_UPDATE_ERROR: 'Error updating client feedback status.',

  // document file messages

  DOCUMENT_FILE_CREATED_SUCCESS: 'Document file created successfully',
  DOCUMENT_FILE_UPDATED_SUCCESS: 'Document file updated successfully',
  DOCUMENT_FILE_DELETED: 'Document file deleted successfully',
  DOCUMENT_FILE_NOT_FOUND: 'Document file not found',
  DOCUMENT_FILE_STATUS_UPDATED: 'Document file status updated successfully',
  FAILED_TO_RETRIEVE_DOCUMENT_FILES: 'Failed to retrieve document files',
  DOCUMENT_FILE_EXISTS: 'Document file with same exists',

  // google meet messages

  GOOGLE_MEET_CREATED_SUCCESS: 'Google meet created successfully',
  GOOGLE_MEET_UPDATED_SUCCESS: 'Google meet updated successfully',
  GOOGLE_MEET_DELETED: 'Google meet deleted successfully',
  GOOGLE_MEET_NOT_FOUND: 'Google meet not found',
  GOOGLE_MEET_STATUS_UPDATED: 'Google meet status updated successfully',
  FAILED_TO_RETRIEVE_GOOGLE_MEETS: 'Failed to retrieve google meets',
  GOOGLE_MEET_EXISTS: 'Google meet with same exists',

  // event programs messages

  EVENT_PROGRAMS_CREATED_SUCCESS: 'Event program created successfully',
  EVENT_PROGRAMS_UPDATED_SUCCESS: 'Event program updated successfully',
  EVENT_PROGRAMS_DELETED: 'Event program deleted successfully',
  EVENT_PROGRAMS_NOT_FOUND: 'Event program not found',
  EVENT_PROGRAMS_STATUS_UPDATED: 'Event program status updated successfully',
  FAILED_TO_RETRIEVE_EVENT_PROGRAMS: 'Failed to retrieve event programs',
  EVENT_PROGRAMS_EXISTS: 'Event program with same exists',

  // recruitment post messages

  RECRUITMENT_POST_CREATED_SUCCESS: 'Recruitment post created successfully',
  RECRUITMENT_POST_UPDATED_SUCCESS: 'Recruitment post updated successfully',
  RECRUITMENT_POST_DELETED: 'Recruitment post deleted successfully',
  RECRUITMENT_POST_NOT_FOUND: 'Recruitment post not found',
  RECRUITMENT_POST_STATUS_UPDATED:
    'Recruitment post status updated successfully',
  FAILED_TO_RETRIEVE_RECRUITMENT_POSTS: 'Failed to retrieve recruitment posts',
  RECRUITMENT_POST_EXISTS: 'Recruitment post with same exists',
};
