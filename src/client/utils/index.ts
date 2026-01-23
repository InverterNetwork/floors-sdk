export * from './chart'

// Re-export error handling utilities from main SDK
export {
  type EnhancedParsedError,
  type ErrorCategory,
  type ErrorContext,
  type ErrorSeverity,
  getErrorCategory,
  getParsedError,
  getRecoveryActions,
  handleError,
  type HandleErrorParams,
  isErrorType,
  isPermissionError,
  isUserRejection,
  type ParsedError,
  type RecoveryAction,
} from '../../utils'
