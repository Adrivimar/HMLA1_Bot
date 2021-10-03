require('dotenv').config()
const { Telegraf } = require('telegraf')
const axios = require('axios');
const express = require('express');
const app = express();

app.get('/bot3eso', (req, res) => {
    res.send('eso3bot');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});


const bot = new Telegraf(process.env.BOT_TOKEN);

//Start

bot.command('start', ctx =>{
    sendStartMessage(ctx);
})

bot.command('start@HMLA1_BOT', ctx =>{
    sendStartMessage(ctx);
})

//Avisos

bot.hears('Avisos', ctx => {
    sendAvisosMessage(ctx);
})

bot.command('avisos', ctx => {
    sendAvisosMessage(ctx);
})

bot.command('avisos@HMLA1_BOT', ctx => {
    sendAvisosMessage(ctx);
})

//Deberes

bot.hears('Deberes', ctx => {
    sendDeberesMessage(ctx);
})

bot.command('deberes', ctx => {
    sendDeberesMessage(ctx);
})

bot.command('deberes@HMLA1_BOT', ctx => {
    sendDeberesMessage(ctx);
})

//Horario

bot.hears('Horario', ctx => {
    const id_chat = ctx.message.chat.id;
    const photo = "https://1drv.ms/u/s!Anf9zerUTHWwuxeGMegVg76g2l_-?e=f7v2xD";

    ctx.telegram.sendPhoto(id_chat, photo, {caption: "Recuerda que los viernes entramos a las 15:00 y no a las 14:45"});
});

bot.command('horario', ctx => {
    const id_chat = ctx.message.chat.id;
    const photo = "https://1drv.ms/u/s!Anf9zerUTHWwuxeGMegVg76g2l_-?e=f7v2xD";

    ctx.telegram.sendPhoto(id_chat, photo, {caption: "Recuerda que los viernes entramos a las 15:00 y no a las 14:45"});
});

//Bienvenida (/start)

function sendStartMessage (ctx) {
    console.log(ctx.from)
    console.log(ctx.chat)
    console.log(ctx.message)
    console.log(ctx.updateSubTypes)

    const startMessage = '¡Hola ' + '@' + ctx.from.username + '! ' + 'Soy el bot que te ayudará a organizarte :)' + "\n\n" + "Elige una opción para continuar\n🔽🔽🔽";

    bot.telegram.sendMessage(ctx.chat.id, startMessage, {
        reply_markup: {
            inline_keyboard: [

                [
                    {text: "Menú", callback_data: 'menu'}
                ],

                [
                    {text: "Comandos", callback_data: 'comandos'},
                    {text: "Acerca de este bot", callback_data: 'acerca'}
                ],

            ]
        }
    })
}



//Menú de botones para navegar (manera gráfica)

bot.action('menu', ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón
    
    const menuMessage = ctx.from.first_name + "," + " seleccione una opción"
    bot.telegram.sendMessage(ctx.chat.id, menuMessage, {
        reply_markup: {
            keyboard: [
                [
                    { text: "Deberes" },
                    { text: "Horario" },
                    { text: "Asignaturas"}

                ],

                [
                    { text: "Avisos" },
                    { text: "Sugerencias"},

                ],

                [
                    { text: "❌"}
                ]
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
})

//Acciones al pulsar el botón ❌

bot.hears('❌', ctx => {
bot.telegram.sendMessage(ctx.chat.id, "", {
        reply_markup: {
            remove_keyboard: true,
        }    
    })
})

//Deberes

function sendDeberesMessage (ctx) {
    const deberesMessage = 'Los deberes se muestran gracias a aquellas personas que los añaden. Por lo que pueden cometer errores.';

    bot.telegram.sendMessage(ctx.chat.id, deberesMessage, {
        reply_markup: {
            inline_keyboard: [

                [
                    { text: "Continuar", callback_data: "continuar_deberes"}
                ]

            ]
        }
    })
}

//Lista de deberes

bot.action('continuar_deberes', ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón
            bot.telegram.sendMessage(ctx.chat.id, "¡Hola " + ctx.from.first_name + "!" + " En este excel encontras información al respecto" + "\n\n" + "https://docs.google.com/spreadsheets/d/1t4jrx9P34vjBP8sRc69-WFRF8iqJpZYJ12wjYPLYTOA/edit?usp=sharing");

            })

//Avisos

function sendAvisosMessage (ctx) {
    const avisosMessage = 'Ten en cuenta que no todos los avisos pueden ser correctos. A demás de que los avisos los puede subir/editar cualquiera con acceso al archivo de avisos de este bot.';

    bot.telegram.sendMessage(ctx.chat.id, avisosMessage, {
        reply_markup: {
            inline_keyboard: [

                [
                    { text: "Continuar", callback_data: "Continuar_avisos"}
                ]

            ]
        }
    })
}

//Menú de opciones de Avisos

bot.action('Continuar_avisos', ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón
    
    const menuMessage = ctx.from.first_name + "," + " seleccione una opción"
    bot.telegram.sendMessage(ctx.chat.id, menuMessage, {
        reply_markup: {
            keyboard: [
                [
                    { text: "Resumen de los avisos" },
                    { text: "Faltas de los profesores" }
                ],

                [    
                    { text: "Excursiones" },
                    { text: "Otros" }
                ],    

                [
                    { text: "❌"}
                ]
    
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
})

//Resumen de los avisos

bot.hears("Resumen de los avisos", ctx =>{
    bot.telegram.sendMessage(ctx.chat.id, "1. Viaje a la Nieve 2021" + "\n\n" + "Distinguidos padres y madres:" + "\n" +
    "Nos dirijimos a vosotros para informaros sobre el viaje que realizaremos a la nieve el próximo mes de diciembre de 2021. El objetivo del mismo es dar la oportunidad a vuestr@s hij@s de probar un deporte nuevo y de vivir una experiencia inolvidable junto a sus compañer@s. " +
    "\n" + "En el siguiente enlace tenéis toda la información en la primera página, y la ficha de inscripción en la segunda" + "\n\n" + "Para cualquier duda acerca de este viaje podéis poneros en contacto con el profesorado responsable del viaje:" +
    "\n" + "Joaqín Casillas joaquin.casillas@juandegaray.es" + "\n" + "Mila Díaz mila.diaz@juandegaray.es" + "\n\n" + "Saludos" + "\n\n" + "Más información: https://drive.google.com/file/d/1C0O4w8tdd8rbpFAhBwI3-D4Ql2qB9edy/view" + "\n\n" + "Fecha de publiación: 27/08/2021" +
    "\n\n" + "2. AMPA Informa: mercadillo libros lectura se postpone a martes 5 de octubre" + "\n\n" + 
    "El mercadillo de libros de lectura, anunciado inicialmente para el próximo jueves día 30 de septiembre, se postpone y se realizará:" +
     "\n" + "- Día: martes 05 de octubre" + "\n" + "- Hora: de 17:15 a 18:15h" + "\n" + "- Lugar: jardín del IES " + "\n" + 
     "Os recordamos que se podrán intercambiar o vender los libros de lectura de 1º de ESO a 2º de Bachillerato " +
     "Próximamente se publicarán los libros de lectura recomendados por los departamentos" + "\n\n" + "Fecha de publicación: 27/09/2021", {
        reply_markup: {
            remove_keyboard: true,
        }
    })
})

//Faltas de los profesores

bot.hears("Faltas de los profesores", ctx =>{
    bot.telegram.sendMessage(ctx.chat.id, "Sin faltas que mostrar", {
        reply_markup: {
            remove_keyboard: true,
        }
    })
})

//Excursioneshears

bot.hears("Excursiones", ctx =>{
    bot.telegram.sendMessage(ctx.chat.id, "1. Viaje a la Nieve 2021" + "\n\n" + "Distinguidos padres y madres:" + "\n" +
    "Nos dirijimos a vosotros para informaros sobre el viaje que realizaremos a la nieve el próximo mes de diciembre de 2021. El objetivo del mismo es dar la oportunidad a vuestr@s hij@s de probar un deporte nuevo y de vivir una experiencia inolvidable junto a sus compañer@s. " +
    "\n" + "En el siguiente enlace tenéis toda la información en la primera página, y la ficha de inscripción en la segunda" + "\n\n" + "Para cualquier duda acerca de este viaje podéis poneros en contacto con el profesorado responsable del viaje:" +
    "\n" + "Joaqín Casillas joaquin.casillas@juandegaray.es" + "\n" + "Mila Díaz mila.diaz@juandegaray.es" + "\n\n" + "Saludos" + "\n\n" + "Más información: https://drive.google.com/file/d/1C0O4w8tdd8rbpFAhBwI3-D4Ql2qB9edy/view" + "\n\n" + "Fecha de publiación: 27/08/2021", {
        reply_markup: {
            remove_keyboard: true,
        }
    })
})

//Otros

bot.hears("Otros", ctx =>{
    bot.telegram.sendMessage(ctx.chat.id, "1. AMPA Informa: mercadillo libros lectura se postpone a martes 5 de octubre" + "\n\n" + 
    "El mercadillo de libros de lectura, anunciado inicialmente para el próximo jueves día 30 de septiembre, se postpone y se realizará:" +
     "\n" + "- Día: martes 05 de octubre" + "\n" + "- Hora: de 17:15 a 18:15h" + "\n" + "- Lugar: jardín del IES" + "\n" + 
     "Os recordamos que se podrán intercambiar o vender los libros de lectura de 1º de ESO a 2º de Bachillerato " +
     "Próximamente se publicarán los libros de lectura recomendados por los departamentos" + "\n\n" + "Fecha de publicación: 27/09/2021", {
        reply_markup: {
            remove_keyboard: true,
        }
    })
})

//Sugerencias

bot.command('sugerencias', ctx =>  {

    const menuMessage = ctx.from.first_name + "," + " seleccione una opción"
    bot.telegram.sendMessage(ctx.chat.id, menuMessage, {
        reply_markup: {
            keyboard: [
                [
                    { text: "Sobre la clase" },
                    { text: "Sobre el bot" }
                ],

                [
                    { text: "❌"}
                ]
    
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })    
})

bot.hears('Sugerencias', ctx => {

    const menuMessage = ctx.from.first_name + "," + " seleccione una opción"
    bot.telegram.sendMessage(ctx.chat.id, menuMessage, {
        reply_markup: {
            keyboard: [
                [
                    { text: "Sobre la clase" },
                    { text: "Sobre el bot" }
                ],

                [
                    { text: "❌"}
                ]
    
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
})

//Sobre la clase

bot.hears("Sobre la clase", ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Si tienes alguna sugerencia, te gustaría cambiar algo... Respecto a nuestra clase. Puedes decirlo aquí." + "\n" + "🔽🔽🔽"
    + "\n" + "https://forms.gle/CpfsoKEgzNFjNm8L9" + "\n\n" + "¡Gracias por tus sugerencias!")
})

//Sobre el bot

bot.hears("Sobre el bot", ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Si tienes alguna sugerencia, te gustaría cambiar algo... Respecto a este bot @HMLA1_BOT. Puedes decirlo aquí." + "\n" + "🔽🔽🔽"
    + "\n" + "https://forms.gle/w2AT5Bgoej1SNevC9" + "\n\n" + "¡Gracias por tus sugerencias!")
})

//Asignaturas

bot.command('Asignaturas', ctx => {

    const menuMessage = ctx.from.first_name + "," + " seleccione una opción"
    bot.telegram.sendMessage(ctx.chat.id, menuMessage, {
        reply_markup: {
            keyboard: [
                [
                    { text: "Matemáticas" },
                    { text: "Castellano" }
                ],

                [
                    { text: "Física y Química" },
                    { text: "Educación Física" }
                ],

                [
                    { text: "Biología y Geología"},
                    { text: "Valenciano" }
                ],

                [
                    { text: "Geografía e Historia" },
                    { text: "Inglés" }
                ],

                [
                    { text: "Valores Éticos" },
                    { text: "Religión"}
                ],

                [
                    { text: "❌"}
                ]
    
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
})

bot.hears('Asignaturas', ctx => {

    const menuMessage = ctx.from.first_name + "," + " seleccione una opción"
    bot.telegram.sendMessage(ctx.chat.id, menuMessage, {
        reply_markup: {
            keyboard: [
                [
                    { text: "Matemáticas" },
                    { text: "Castellano" }
                ],

                [
                    { text: "Física y Química" },
                    { text: "Educación Física" }
                ],

                [
                    { text: "Biología y Geología"},
                    { text: "Valenciano" }
                ],

                [
                    { text: "Geografía e Historia" },
                    { text: "Inglés" }
                ],

                [
                    { text: "Valores Éticos" },
                    { text: "Religión"}
                ],

                [
                    { text: "❌"}
                ]
    
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
})

//Matemáticas

bot.hears('Matemáticas', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Nombre: Unknow" + "\n" + "Email: Unknow")
})

//Castellano

bot.hears('Castellano', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Nombre: Unknow" + "\n" + "Email: Unknow")
})

//Física y Química

bot.hears('Física y Química', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Nombre: Unknow" + "\n" + "Email: Unknow")
})

//Educación Física

bot.hears('Educación Física', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Nombre: Unknow" + "\n" + "Email: Unknow")
})

//Biología y Geología

bot.hears('Biología y Geología', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Nombre: Unknow" + "\n" + "Email: Unknow")
})

//Valenciano

bot.hears('Valenciano', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Nombre: Unknow" + "\n" + "Email: Unknow")
})

//Geografía e Historia

bot.hears('Geografía e Historia', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Nombre: Unknow" + "\n" + "Email: Unknow")
})

//Inglés

bot.hears('Inglés', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Nombre: Unknow" + "\n" + "Email: Unknow")
})

//Valores Éticos

bot.hears('Valores Éticos', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Nombre: Unknow" + "\n" + "Email: Unknow")
})

//Religión

bot.hears('Religión', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Nombre: Unknow" + "\n" + "Email: Unknow")
})

//Acerca del bot

bot.action('acerca', ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón
    ctx.reply('El proposito de este bot es poder ayudarte a organizarte y actualizarte con avisos y novedades.' + '\n\n' + 'Información detallada del bot'
    + '\n\n' + 'Creador: @horacio507' + '\n' + 'Versión del bot: 1.1' + '\n\n' + 'Estás en la versión beta');
})

bot.command('info', ctx => {
    ctx.reply('El proposito de este bot es poder ayudarte a organizarte y actualizarte con avisos y novedades.' + '\n\n' + 'Información detallada del bot'
    + '\n\n' + 'Creador: @horacio507' + '\n' + 'Versión del bot: 1.1' + '\n\n' + 'Estás en la versión beta');
})

bot.command('info@HMLA1_BOT', ctx => {
    ctx.reply('El proposito de este bot es poder ayudarte a organizarte y actualizarte con avisos y novedades.' + '\n\n' + 'Información detallada del bot'
    + '\n\n' + 'Creador: @horacio507' + '\n' + 'Versión del bot: 1.1' + '\n\n' + 'Estás en la versión beta');
})


//Comandos

bot.action('comandos', ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón
    ctx.reply("Aquí están algunos de los comandos del bot" + "\n\n" + "Multimedia" + "\n" + "/deberes - Deberes mandados en clase" + "\n" + "/avisos - Avisos, notificaciones..."
    + "\n" + "/sugerencias - formulario para sugerencias sobre la clase o el bot" +
    + "\n\n" + "Sobre el bot" + "\n" + "/info - Información sobre el bot");
})



bot.launch();
