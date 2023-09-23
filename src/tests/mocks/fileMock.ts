export {};
module.exports = 'test-file-stub';

export const useLocation = jest.fn().mockReturnValue({
  pathname: '/',
  search: '',
  state: null,
  hash: '',
});
