/**
 * stable useCallback
 * @author mebtte<i@mebtte.com>
 */
declare function useEvent<Callback extends (...args: unknown[]) => unknown>(callback: Callback): (...args: Parameters<Callback>) => unknown;
export default useEvent;
