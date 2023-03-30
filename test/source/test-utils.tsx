// import React, { ReactElement } from 'react'
// import { render, RenderOptions } from '@testing-library/react'
// import { TranslationProvider } from 'my-i18n-lib'
// import defaultStrings from 'i18n/en-x-default'
//
// const AllTheProviders = ({ children }: { children: React.ReactNode }) => (
//   <ThemeProvider theme="light">
//     <TranslationProvider messages={defaultStrings}>{children}</TranslationProvider>
//   </ThemeProvider>
// )
//
// const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
//   render(ui, { wrapper: AllTheProviders, ...options })
//
export * from '@testing-library/react'
// export { customRender as render }
