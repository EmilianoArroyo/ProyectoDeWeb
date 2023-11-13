$(document).ready(() => {
    $('form').on('submit', (event) => {
        event.preventDefault();
        if (!event.currentTarget.checkValidity()) {
            event.stopPropagation();
        }

        const artistData = {
            name: $('#nombre').val(),
            username: $('#username').val(),
            genre: $('#genre').val(),
            email: $('#email').val(),
            password: $('#password').val(),
            description: $('#description').val(),
            Influences: $('#influences').val()
        };
        for (let key in artistData) {
            if (artistData[key] === '') {
                Swal.fire({
                    toast: true,
                    position: 'top-right',
                    icon: 'error',
                    title: 'Por favor, llena todos los campos antes de registrarte.',
                    showConfirmButton: false,
                    timer: 4000
                })
                return;
            }
        }

        $.ajax({
            type: "POST",
            url: "http://localhost:3000/api/register/artist",
            data: JSON.stringify(artistData),
            contentType: 'application/json',
            success: function (datos) {
                setTimeout(() => {
                    let timerInterval
                    Swal.fire({
                        title: 'Usuario registrado exitosamente',
                        html: 'Redireccionando ...',
                        timer: 1000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading()
                            const b = Swal.getHtmlContainer().querySelector('b')
                            timerInterval = setInterval(() => {
                            }, 1000)
                        },
                        willClose: () => {
                            clearInterval(timerInterval)
                        }
                    }).then((result) => {
                        if (result.dismiss === Swal.DismissReason.timer) {
                            window.location = './../logins/login_artist.html';
                        }
                    })
                }, 1000);
                $("form")[0].reset();
            },
            error: function (xhr, status, err) {
                console.error('Error:', err);
                var response = JSON.parse(xhr.responseText);
                if (xhr.status === 400 && response.error === "El email ya existe en la base") {
                    Swal.fire({
                        toast: true,
                        position: 'top-right',
                        icon: 'error',
                        title: 'El email ya está registrado. Por favor, usa un email diferente.',
                        showConfirmButton: false,
                        timer: 4000
                    })
                } else {
                    Swal.fire({
                        toast: true,
                        position: 'top-right',
                        icon: 'error',
                        title: 'Hubo un error al registrarlo. Inténtalo de nuevo.',
                        showConfirmButton: false,
                        timer: 4000
                    })
                }
            }
        })

        $(this).addClass('was-validated');
    });
});
