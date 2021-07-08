Swal.fire({
    title: "¿Seguro que deseas eliminar los contactos seleccionados?",
    html: "<button>cancelar</button>",
    icon : '<i class="fas fa-user-times"></i>',
    confirmBttonText: "eliminar",
    allowOutsideClick: "false",
	allowEscapeKey:"false",
	allowEnterKey:"false",
	stopKeydownPropagation:"false"
})