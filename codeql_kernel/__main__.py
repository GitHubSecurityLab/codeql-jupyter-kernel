from ipykernel.kernelapp import IPKernelApp
from . import CodeQLKernel

IPKernelApp.launch_instance(kernel_class=CodeQLKernel)
