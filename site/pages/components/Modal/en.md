# Modal
You can use Modal to display secondary content or actions without jumping to the page.

<example />

## API

### Modal
<api name="Modal" />


### ModalMethods

Modal provides several static methods for globally calling. The elements generated by these methods are destroyed when it is closed. This set of methods should be used only for presentations. If you need data interaction, use Modal.

Modal.info(options)

Modal.success(options)

Modal.error(options)

Modal.confirm(options)

Modal.show(options)

Modal.closeAll() // close all modal

#### Options Parameter

** *options support Modal in addition to any other properties of usePortal and destory, there are additional properties as follows **

<api name="ModalMethods" />
