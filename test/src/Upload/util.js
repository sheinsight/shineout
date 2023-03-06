export const uploadFile = (wrapper, options = {}) => {
  const blob = new File(['content'], options.name, { type: 'text/plain', ...options })
  wrapper.find('input').prop('onChange')({
    target: {
      files: [blob],
    },
  })
}
export const mockXhr = () => {
  const xhr = {
    withCredentials: undefined,
    open: jest.fn(),
    send: jest.fn(),
    setRequestHeader: jest.fn(),
    upload: {
      addEventListener: jest.fn((key, handler) => {
        xhr.upload[key] = handler
      }),
    },
  }
  const xhrMockClass = () => xhr
  window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass)
  return xhr
}
