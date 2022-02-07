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

//5
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
    const photo = "https://1drv.ms/u/s!Anf9zerUTHWwz0cMc7sZNoXjRIr-";

    ctx.telegram.sendPhoto(id_chat, photo, {caption: "Recuerda que los viernes entramos a las 15:00 y no a las 14:45"});
});

bot.command('horario', ctx => {
    const id_chat = ctx.message.chat.id;
    const photo = "https://1drv.ms/u/s!Anf9zerUTHWwz0cMc7sZNoXjRIr-";

    ctx.telegram.sendPhoto(id_chat, photo, {caption: "Recuerda que los viernes entramos a las 15:00 y no a las 14:45"});
});

//Fecha

var f = new Date();
bot.command("date", ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Hola " + ctx.from.first_name + ". Hoy estamos a"+ "\n" + f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear())
})

//Reportar Errores

bot.command('report@HMLA1_BOT', ctx => {
    sendReportMessage(ctx);
})

bot.command('reportar', ctx => {
    sendReportMessage(ctx);
})

function sendReportMessage (ctx) {

    const reportMessage = "REPORTAR ERRORES" + "\n\n" + "Si has encontrado algún error con el bot, ya sea ortográfico, información incorrecta..." + "\n\n" + "No dudes en contactar con @horacio507 o contestar a este formulario (https://forms.gle/w2AT5Bgoej1SNevC9)" + "\n\n" + "¡Gracias!"

    bot.telegram.sendMessage(ctx.chat.id, reportMessage, {
        reply_markup: {
            inline_keyboard: [

                [
                    { text: "Lista de contribuciones", callback_data: "lista_contribuciones"}
                ]

            ]
        }
    })
}

bot.command('contribuciones', ctx => {
            bot.telegram.sendMessage(ctx.chat.id, "¡Hola " + ctx.from.first_name + "!" + "\n" + "Si has contribuido de alguna manera a este bot, ya sea añadiendo los deberes, reportando errores, escribiendo sugerencias... Tu nombre aparecerá en esta lista junto a tus contribuciones" 
            + "\n\n" + "PD: Aquellos y aquellas que ayuden con el bot se les recompensará ;)" + "\n\n" + "LISTA DE CONTRIBUCIONES"
            + "\n\n" + "#1 Adrián - 2 Sugerencias + Añadir los deberes" + "\n" + "#2 Falou - Añadir los deberes" + "\n" + "#3 Marcos P. - Añadir los deberes");

})

bot.action("contribuciones"), ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "¡Hola " + ctx.from.first_name + "!" + "\n" + "Si has contribuido de alguna manera a este bot, ya sea añadiendo los deberes, reportando errores, escribiendo sugerencias... Tu nombre aparecerá en esta lista junto a tus contribuciones" 
    + "\n\n" + "PD: Aquellos y aquellas que ayuden con el bot se les recompensará ;)" + "\n\n" + "LISTA DE CONTRIBUCIONES"
    + "\n\n" + "#1 Adrián - 2 Sugerencias + Añadir los deberes" + "\n" + "#2 Falou - Añadir los deberes");
}

bot.command("/notificar", ctx => {
    bot.telegram.sendMessage(Marcos_P, "¡Hola Marcos!" + "\n\n" + "Gracias por tu colaboración con el bot. Utilizando el comando /contribuciones podrás ver el ranking de aquell@s que más colaboráis." + "\n" + "¡Gracias!")

})


//Bienvenida (/start)

function sendStartMessage (ctx) {

    const startMessage = '¡Hola ' + '@' + ctx.from.username + '! ' + 'Soy el bot que te ayudará a organizarte :)' + "\n\n" + "Elige una opción para continuar\n🔽🔽🔽";

    bot.telegram.sendMessage(ctx.chat.id, startMessage, {
        reply_markup: {
            inline_keyboard: [

                [
                    {text: "Menú", callback_data: 'menu'}
                ],

                [
                    {text: "Novedades", callback_data: 'news'}
                ],

                [
                    {text: "Comandos", callback_data: 'comandos'},
                    {text: "Acerca de este bot", callback_data: 'acerca'}
                ]

            ]
        }
    })
}

//News/Novedades

bot.command('news', ctx => {

    const menuMessage = ctx.from.first_name + "," + " seleccione una opción"
    bot.telegram.sendMessage(ctx.chat.id, menuMessage, {
        reply_markup: {
            keyboard: [
                [
                    { text: "Últimos cambios" },
                    { text: "Novedades de la versión " + version },
                    { text: "GitHub"}

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



bot.action('news', ctx => {
    ctx.answerCbQuery(); // para quitar el icono de cargando del botón

    const menuMessage = ctx.from.first_name + "," + " seleccione una opción"
    bot.telegram.sendMessage(ctx.chat.id, menuMessage, {
        reply_markup: {
            keyboard: [
                [
                    { text: "Últimos cambios" },
                    { text: "Novedades de la versión " + version },
                    { text: "GitHub"}

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

//Últimos cambios

bot.hears("Últimos cambios", ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Hola " + ctx.from.first_name + ". Estos son los últimos cambios" + "\n\n" + "AVISOS DEL BOT" + "\n" + "Ahora el bot (@HMLA1_BOT) está configurado para" 
    + " poder enviarte por privado avisos como:" + "\n" + "- Días restantes para x examen" + "\n" + "- Mensajes de Itaca" + "\n" + "- Mensajes semanales con información sobre todos los exámenes "
    + "de la semana + el útlimo mensaje de Itaca." + "\n" + "- Mensajes con novedades del bot" + "\n\n" + "Para poder subscribirte a las noticias del bot solo tienes que ir a un chat privado con el bot y utilizar el comando /subscribe"
    + "\n\n" + "ASIGNATURAS AÑADIDAS" + "\n" + "Escribiendo el nombre de una asignatura como por ejemplo Castellano; puedes ver información sobre el profesor (nombre y apellidos + su email"
    + "\n" + "Asignaturas añadidas:" + "\n" + "- Plástica" + "\n" + "- Música"
    + "\n\n" + "NUEVOS COMANDOS" + "\n" + "/date - Este comando te dirá la fecha de hoy"
    + "\n\n" + "Fecha: 22/10/2021")
})

//Novedades de la versión

bot.hears("Novedades de la versión 1.5", ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Hola " + ctx.from.first_name + " . Esta versión (" + version + ") incluye lo siguiente:" + "\n\n"
    + "- Avisos por parte del bot" + "\n" + "- Nuevos comandos (/date)" + "\n" + "- Sección  de novedades" + "\n" + "- Errores reparados y una mejor optimización de código.")
})

bot.hears("GitHub", ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Hola " + ctx.from.first_name + ". Aquí puedes ver el repositorio donde se encuentra el código del bot." + "\n" +"🔽🔽🔽🔽🔽" + "\n" + "www.github.com/horacio507/HMLA1_BOT")
})


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
            bot.telegram.sendMessage(ctx.chat.id, "¡Hola " + ctx.from.first_name + "!" + " En este enlace podrás ver más información: https://www.notion.so/Deberes-f6f904e0fb0e49019a8db836dc524fdf");
 })

//Avisos

function sendAvisosMessage (ctx) {
    const avisosMessage = 'Ten en cuenta que no todos los avisos pueden ser correctos.';

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
                    { text: "Días Festivos"}
                ],    

                [
                    {text: "Otros"}
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
    bot.telegram.sendMessage(ctx.chat.id, "",

    {
        reply_markup: {
            remove_keyboard: true,
        }
    })
})

//Faltas de los profesores

bot.hears("Faltas de los profesores", ctx =>{
    bot.telegram.sendMessage(ctx.chat.id, "Faltas recientes notificadas" + "\n\n" + "12/11/21" + "\n" + "Biología y Geología - Beatriz" + "\n\n" + "Faltas pasadas notificadas" + "\n\n" + "28/10/21" + "\n" + "Música - Unknow", {
        reply_markup: {
            remove_keyboard: true,
        }
    })
})

//Excursioneshears

bot.hears("Excursiones", ctx =>{
    bot.telegram.sendMessage(ctx.chat.id, "Sin excursiones que mostrar", {
        reply_markup: {
            remove_keyboard: true,
        }
    })
})

//Días Festivos

bot.hears("Días Festivos", ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "DÍAS FESTIVOS CURSO ESCOLAR (ESO) 2021-2022" + "\n\n" + "1.- INICIO Y FIN DE CURSO:" + "\n" + "En Educación Secundaria Obligatoria se iniciarán el 8 de septiembre de 2021 y finalizarán el 17 de junio de 2022." 
    + "\n\n" + "2.- VACACIONES:" + "\n" + "Los períodos de vacaciones del curso 2021-2022 serán los siguientes:" + "\n" + "1.- Vacaciones de Navidad: desde el 23 de diciembre de 2021 al 7 de enero de 2022"
    + "\n" + "2. Vacaciones de Pascua: del 14 al 25 de abril de 2022, ambos inclusive." + "\n\n" + "3.- DÍAS FESTIVOS:" + "\n" + "Durante este curso escolar serán festivos los días siguientes:" + "\n"
    + "12 de octubre, Fiesta Nacional de España." + "\n"
    + "1 de noviembre, Fiesta de todos los Santos." + "\n"
    + "6 de diciembre, Dia de la Constitución." + "\n"
    + "8 de diciembre, Día de la Inmaculada Concepción." + "\n"
    + "24 de junio San Juan." + "\n\n" + "Fuente: https://www.gva.es/es/inicio/procedimientos?id_proc=18742")
})

//Otros

bot.hears("Otros", ctx =>{
    bot.telegram.sendMessage(ctx.chat.id, "Sin otros avisos que mostrar",
    {
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
                    { text: "Música" },
                    { text: "Plástica"}
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
    bot.telegram.sendMessage(ctx.chat.id, "Nombre: Unknow" + "\n" + "Email: Unknows")
})

//Física y Química

bot.hears('Física y Química', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Nombre:Unknow" + "\n" + "Email: Unknow")
})

//Educación Física

bot.hears('Educación Física', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Nombre: Unknow" + "\n" + "Email: Unknows")
})

//Biología y Geología

bot.hears('Biología y Geología', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Nombre: Unknow" + "\n" + "Email: Unknow")
})

//Valenciano

bot.hears('Valenciano', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Nombre: Unknowl" + "\n" + "Email:Unknow")
})

//Geografía e Historia

bot.hears('Geografía e Historia', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Nombre: Unknow" + "\n" + "Email: Unknow")
})

//Inglés

bot.hears('Inglés', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Nombre: Unknow" + "\n" + "Email: Unknow")
})

//Música

bot.hears('Música', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Nombre: Unknow" + "\n" + "Email: Unknow")
})

//Plástica
bot.hears("Plástica", ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Nombre: Unknows" + "\n" + "Email: Unknow")
})

//Valores Éticos

bot.hears('Valores Éticos', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Nombre: Unknow" + "\n" + "Email: Unknow")
})

//Religión

bot.hears('Religión', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Nombre: Unknow" + "\n" + "Email: Unknow")
})

//ENVIAR MENSAJES A TRAVÉS DEL BOT

var Adrián = "";
var Horacio = "";
var Grupo = "";
var Elena = "";
var Marcos_U = "";
var Adriana = "";
var Marcos_P = "";
var Falou = "";
var Aaron = "";

bot.hears('send_general', ctx => {
    bot.telegram.sendMessage(Grupo, "Buenos días grupo. Aquí os muestro un resumen de esta semana." + "\n\n" + mess_exámenes + "\n\n" + mess_itaca + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕") //Grupo 
    bot.telegram.sendMessage(Horacio, "Buenos días Horacio. Aquí te muestro un resumen de esta semana." + "\n\n" + mess_exámenes + "\n\n" + mess_itaca + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕")    //Horacio (Yo)
    bot.telegram.sendMessage(Adrián, "Buenos días Adrián. Aquí te muestro un resumen de esta semana." + "\n\n" + mess_exámenes + "\n\n" + mess_itaca + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕") //Adrián
    bot.telegram.sendMessage(Elena, "Buenos días Elena. Aquí te muestro un resumen de esta semana que viene." + "\n\n" + mess_exámenes + "\n\n" + mess_itaca + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕") //Elena
    bot.telegram.sendMessage(Marcos_U , "Buenos días Marcos. Aquí te muestro un resumen de esta semana que viene." + "\n\n" +  mess_exámenes + "\n\n" + mess_itaca + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕") //Marcos U.
    bot.telegram.sendMessage(Adriana, "Buenos días Adriana. Aquí te muestro un resumen de esta semana que viene." + "\n\n" +  mess_exámenes + "\n\n" + mess_itaca + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕") //Adriana
    bot.telegram.sendMessage(Marcos_P, "Buenos días Marcos. Aquí te muestro un resumen de esta semana que viene." + "\n\n" +  mess_exámenes + "\n\n" + mess_itaca + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕") //Marcos P.
    bot.telegram.sendMessage(Falou, "Buenos días Falou. Aquí te muestro un resumen de esta semana que viene." + "\n\n" +  mess_exámenes + "\n\n" + mess_itaca + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕") //Falou
    bot.telegram.sendMessage(Aaron, "Buenos días Falou. Aquí te muestro un resumen de esta semana que viene." + "\n\n" +  mess_exámenes + "\n\n" + mess_itaca + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕") //Aaron

})

bot.hears('send_proxexamen', ctx => {
    bot.telegram.sendMessage(Grupo, mess_proxexámenes1) //Grupo 
    bot.telegram.sendMessage(Horacio, mess_proxexámenes1)    //Horacio (Yo)
    bot.telegram.sendMessage(Adrián, mess_proxexámenes1) //Adrián
    bot.telegram.sendMessage(Elena, mess_proxexámenes1) //Elena
    bot.telegram.sendMessage(Marcos_U, mess_proxexámenes1) //Marcos U.
    bot.telegram.sendMessage(Adriana,  mess_proxexámenes1) //Adriana
    bot.telegram.sendMessage(Marcos_P, mess_proxexámenes1) //Marcos P.
    bot.telegram.sendMessage(Falou, mess_proxexámenes1) //Falou
    bot.telegram.sendMessage(Aaron, mess_proxexámenes1) //Aaron
})

bot.hears('send_exámenes', ctx => {
    bot.telegram.sendMessage(Grupo, mess_exámenes + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕") //Grupo 
    bot.telegram.sendMessage(Horacio, mess_exámenes + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕")    //Horacio (Yo)
    bot.telegram.sendMessage(Adrián, mess_exámenes + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕") //Adrián
    bot.telegram.sendMessage(Elena, mess_exámenes + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕") //Elena
    bot.telegram.sendMessage(Marcos_U, mess_exámenes + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕") //Marcos U.
    bot.telegram.sendMessage(Adriana, mess_exámenes + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕") //Adriana
    bot.telegram.sendMessage(Marcos_P, mess_exámenes + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕") //Marcos P.
    bot.telegram.sendMessage(Falou, mess_exámenes + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕") //Falou
    bot.telegram.sendMessage(Aaron, mess_itaca + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕") //Aaron
})

bot.hears('send_itaca', ctx => {
    bot.telegram.sendMessage(Grupo, mess_itaca + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕") //Grupo 
    bot.telegram.sendMessage(Horacio, mess_itaca + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕")    //Horacio (Yo)
    bot.telegram.sendMessage(Adrián, mess_itaca + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕") //Adrián
    bot.telegram.sendMessage(Elena, mess_itaca + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕") //Elena
    bot.telegram.sendMessage(Marcos_U, mess_itaca + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕") //Marcos U.
    bot.telegram.sendMessage(Adriana, mess_itaca + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕") //Adriana
    bot.telegram.sendMessage(Marcos_P, mess_itaca + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕") //Marcos P.
    bot.telegram.sendMessage(Falou, mess_itaca + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕") //Falou
    bot.telegram.sendMessage(Aaron, mess_itaca + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕") //Aaron
})

bot.hears('send_prueba', ctx => {
    bot.telegram.sendMessage(Horacio, all)
})

 bot.hears('send_confirmation', ctx => {
    bot.telegram.sendMessage(Horacio, "¡Hola, " + ctx.from.first_name + "! Te has suscrito correctamente a los avisos del bot")
 })

var all = "¡FELIZ NAVIDAD! 🥳🥳🥳";

 bot.hears('send_all', ctx => {
    bot.telegram.sendMessage(Horacio, all)    //Horacio (Yo)
    bot.telegram.sendMessage(Adrián, all) //Adrián
    bot.telegram.sendMessage(Elena, all) //Elena
    bot.telegram.sendMessage(Marcos_U, all) //Marcos U.
    bot.telegram.sendMessage(Adriana, all) //Adriana
    bot.telegram.sendMessage(Marcos_P, all) //Marcos P.
    bot.telegram.sendMessage(Falou, all) //Falou
    bot.telegram.sendMessage(Grupo, all) //Grupo
    bot.telegram.sendMessage(Aaron, all) //Aaron
 })

 bot.command('unsubscribe', ctx => {
     bot.telegram.sendMessage(ctx.chat.id, "Ya no recibirás más estos mensajes." + "\n\n" + "Si quieres volver a recibirlos solo tienes que utilizar /subscribe")
     bot.telegram.sendMessage(Horacio, ctx.from.first_name + " (@" + ctx.from.username + ") Quiere dejar de recibir los avisos del bot")
 })

 bot.command('subscribe', ctx =>{
    bot.telegram.sendMessage(ctx.chat.id, "Recibirás un mensaje de confirmación del bot cuando esté todo listo." + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes")
    bot.telegram.sendMessage(Horacio, ctx.from.first_name + " (@" + ctx.from.username + ") Quiere recibir los avisos del bot" + "\n" + "ChatID = " + ctx.chat.id)
 })

//Menú

bot.command('send', ctx => {

    const menuMessage = ctx.from.first_name + "," + " selecciona que mensaje quieres enviar a los usuarios"
    bot.telegram.sendMessage(Horacio, menuMessage, {
        reply_markup: {
            keyboard: [
                [
                    { text: "send_general" },
                    { text: "send_proxexamen" }
                ],

                [
                    { text: "send_itaca" },
                    { text: "send_all" }
                ],

                [
                    { text: "send_prueba"},
                    { text: "send_confirmation" }
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

//MENSAJES A ENVIAR

//Próximo examen
var mess_proxexámenes = "";
var mess_proxexámenes1 = "";

//Exámenes lista
var mess_exámenes = "";

//Mensajes de Itaca
var mess_itaca = "";

//Acerca del bot

var version = "2.0";

bot.action('acerca', ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón
    ctx.reply('El proposito de este bot es poder ayudarte a organizarte y actualizarte con avisos y novedades.' + '\n\n' + 'Información detallada del bot'
    + '\n\n' + 'Creador: @horacio507' + '\n' + 'Versión del bot: ' + version + '\n\n' + 'Estás en la versión estable' + "\n\n" + "☕ PayPal: paypal.me/HMLA1");
})

bot.command('info', ctx => {
    ctx.reply('El proposito de este bot es poder ayudarte a organizarte y actualizarte con avisos y novedades.' + '\n\n' + 'Información detallada del bot'
    + '\n\n' + 'Creador: @horacio507' + '\n' + 'Versión del bot: ' + version + '\n\n' + 'Estás en la versión estable' + "\n\n" + "☕ PayPal: paypal.me/HMLA1");
})

bot.command('info@HMLA1_BOT', ctx => {
    ctx.reply('El proposito de este bot es poder ayudarte a organizarte y actualizarte con avisos y novedades.' + '\n\n' + 'Información detallada del bot'
    + '\n\n' + 'Creador: @horacio507' + '\n' + 'Versión del bot: ' + version + '\n\n' + 'Estás en la versión estable' + "\n\n" + "☕ PayPal: paypal.me/HMLA1");
})

//Comandos

bot.action('comandos', ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón
    ctx.reply("Aquí están algunos de los comandos del bot" + "\n\n" + "Multimedia" + "\n" + "/deberes - Deberes mandados en clase" + "\n" + "/avisos - Avisos, notificaciones..."
    + "\n" + "/sugerencias - formulario para sugerencias sobre la clase o el bot"
    + "\n\n" + "Sobre el bot" + "\n" + "/info - Información sobre el bot");
})



bot.launch();
