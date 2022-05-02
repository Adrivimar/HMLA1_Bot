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

//Mantenimiento 

/*bot.on('text', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "😓 Disculpa las molestias. El bot 🤖 se encuentra en mantenimiento. 🏗")
})*/

//Avisos

bot.hears('Avisos', ctx => {
    sendAvisosMessage(ctx);
})

bot.command(['avisos', 'avisos@HMLA1_BOT'], ctx => {
    sendAvisosMessage(ctx);
})

//Deberes

bot.hears(["Deberes" , "deberes"], ctx => {
    sendDeberesMessage(ctx);
})

bot.hears(['¿Qué deberes hay?', 'qué deberes hay?', 'que deberes hay?', 'Qué deberes hay??', '¿qué deberes hay para mañana?','qué deberes hay para mañana?']  , ctx => {
    sendDeberesMessage(ctx);
})

bot.hears(["qué deberes hay para mañana?", "¿Qué deberes hay para mañana?", "¿Qué deberes habían?", "Que deberes habían?", "Qué deberes habían?", "había algo?", "Había algo?", "¿había algo?", "¿Había algo?"], ctx => {
    sendDeberesMessage(ctx);
})

bot.hears(["qué había de deberes?", "Hay deberes?", "¿Hay deberes?", "hay deberes?", "¿hay deberes?", "¿Qué había de deberes?", "¿qué había de deberes?", "Qué había de deberes?", "Que había de deberes?"], ctx => {
    sendDeberesMessage(ctx);
})

bot.hears(["que había de deberes?", "qué habia de deberes?", "qué deberes hay?", "Qué deberes hay?", "¿Qué habia de deberes?", '¿Habían deberes?', 'Habían deberes?', 'habían deberes?', '¿habían deberes?'], ctx => {
    sendDeberesMessage(ctx);
})

bot.hears(['¿Había deberes?', 'Había deberes?', '¿había deberes?', 'había deberes?', '¿Han mandado deberes?', '¿han mandado deberes?', 'Han mandado deberes?', 'han mandado deberes?'], ctx => {
    sendDeberesMessage(ctx);
})

bot.hears(["Han mandado algo?", "¿Han mandado algo?", "que hay de nuevo?", "Qué han mandado?", "¿Qué han mandado?", "qué han mandado?", "¿qué han mandado?"], ctx => {
    sendDeberesMessage(ctx);
})

bot.command(['deberes@HMLA1_BOT', 'deberes'], ctx => {
    sendDeberesMessage(ctx);
})

//Horario 

function sendHorarioMessage (ctx) {
    const id_chat = ctx.message.chat.id;
    const photo = "https://1drv.ms/u/s!Anf9zerUTHWwz0cMc7sZNoXjRIr-";
    const horarioMessage = "Recuerda que los viernes entramos a las 15:00 y no a las 14:45"

    ctx.telegram.sendPhoto(id_chat, photo, {caption: horarioMessage});
}

bot.hears(['Horario', 'horario'], ctx => {
    sendHorarioMessage(ctx);
})

//LOL

bot.hears(['lol', 'Lol', 'LOL', 'LoL'], ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "<b>**🚆👉🍑**</b>", parse_mode=HTML);
}) 


//Fecha
var f = new Date();
bot.command("date", ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Hola " + ctx.from.first_name + ". Hoy estamos a"+ "\n" + f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear())
})

//Reportar Errores

function sendReportMessage (ctx) {

    const reportMessage = "REPORTAR ERRORES" + "\n\n" + "Si has encontrado algún error con el bot, ya sea ortográfico, información incorrecta..." + "\n\n" + "No dudes en contestar a este formulario (https://forms.gle/w2AT5Bgoej1SNevC9) o enviar tus comentarios desde aquí mismo." + "\n\n" + "¡Gracias!"

    bot.telegram.sendMessage(ctx.chat.id, reportMessage, {
        reply_markup: {
            inline_keyboard: [

                [
                    { text: "Enviar comentarios", callback_data: "send_feedback"}
                ],

                [
                    { text: "Lista de contribuciones", callback_data: "contribuciones"}
                ]

            ]
        }
    })
}

bot.command(['report@HMLA1_BOT', 'reportar'], ctx => {
    sendReportMessage(ctx); 

})

bot.command('report', ctx => {
    msg = ctx.message.text

    msgArray = msg.split(' ') //función que divide todas las palabras con un espacio.
    msgArray.shift() //Elimina la primera palabra (el comando /report)
    reportMsg = msgArray.join(' ') //une el resto de palabras

    bot.telegram.sendMessage(ctx.chat.id, "✅ Mensaje enviado con éxito!")

    bot.telegram.sendMessage(ctx.chat.id, "¡Gracias por tus aportes!")

    bot.telegram.sendMessage(Horacio, "AVISO DE 'REPORTAR ERRORES'" + "\n\n" + "🔤 Nombre: " + ctx.from.first_name + "\n\n" + "👤 Usuario: " + ctx.from.username + "\n\n" + "💬 Mensaje:" + "\n\n" + reportMsg)
})

bot.action('send_feedback', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Escribe /report (y aquí tu texto)." + "\n" + "ℹ️ No es necesario que incluyas los paréntesis.", {
    })
})

/*bot.command('contribuciones', ctx => {
            bot.telegram.sendMessage(ctx.chat.id, "¡Hola " + ctx.from.first_name + "!" + "\n" + "Si has contribuido de alguna manera a este bot, ya sea añadiendo los deberes, reportando errores, escribiendo sugerencias... Tu nombre aparecerá en esta lista junto a tus contribuciones" 
            + "\n\n" + "PD: Aquellos y aquellas que ayuden con el bot se les recompensará ;)" + "\n\n" + "LISTA DE CONTRIBUCIONES"
            + "\n\n" + "#1 Adrián - 2 Sugerencias + Añadir los deberes" + "\n" + "#2 Falou - Añadir los deberes" + "\n" + "#3 Marcos P. - Añadir los deberes");

}) */

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

//News
//Novedades

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
    bot.telegram.sendMessage(ctx.chat.id, "Hola " + ctx.from.first_name + ". Estos son los últimos cambios" + "\n\n" + "ACTUALIZACIÓN A LA VERSIÓN 3.0" + "\n" + "Para ver más detalles de esta actualización utiliza el comando '/news'"
    + "\n\n" + "Fecha: 18/02/2022")
})

//Novedades de la versión

bot.hears("Novedades de la versión " + "3.0", ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Hola " + ctx.from.first_name + ". Esta versión (" + version + ") incluye mejoras en el funcionamiento del bot y se ha intentado simplificar más aún el uso del bot."
    + "\n\n" + "Algunos cambios a destacar son:" + "\n\n" + " - Facilidad al mostrar los deberes: Básicamente ahora no hace falta poner '/deberes' para verlos, puedes incluso preguntarle al bot los deberes literalmente. Ej: ¿Qué deberes hay?, ¿Han mandao algo?..."
    + "\n" + "Hay que tener en cuenta que se han intentado cubrir muchos casos como las faltas ortográficas comunes, abreviaciones, tildes y mayúculas. Por lo que puede que no funcione con todas las frases."
    + "\n\n" + " - Asignaturas: Si no lo sabías, el bot cuenta con una opción que permite saber el nombre y el correo de un profesor/a con sólo poner el nombre de su asignatura. Ej: Matemáticas."
    + "\n" + "Bueno, pues ahora se han añadido opciones nuevas que permiten ver más información como el horario de tutoría del profesor/a y las veces que ha faltado a clase."
    + "\n\n" + "Además, ahora en el menú desplegable del bot al poner '/', se incluye la opción '/asignaturas'."
    + "\n\n" + " - Tips: ¿Tienes dudas de cómo usar el Bot? Pues tienes a tu disposición una sección donde subiré vídeos relacionados con el uso del bot." + "\n" + "Para ver estos tutoriales puedes poner '/' y clicar sobre 'tips 💡' o bien poner '/help'")
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
bot.telegram.sendMessage(ctx.chat.id, "❌", {
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

//NOTION API

/*require('dotenv').config()
const { Client } = require('@notionhq/client');
const notion = new Client({
    auth: process.env.NOTION_API_KEY
}) 



;(async() => {
  const databaseId = 'b8d4c0335f5f42669b958fd6a1c13cce';
    //Date
  const res = await notion.databases.query({
    database_id: databaseId,
    filter: {
        property: "Deadline",
        date: {
            after: "2022-02-22"
        }
    }
  })

  /*bot.hears(notion => {
      bot.telegram.sendMessage(Horacio, res)
  }) * 

})() */

//Lista de deberes

bot.action('continuar_deberes', ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón
            bot.telegram.sendMessage(ctx.chat.id, "¡Hola " + ctx.from.first_name + "!" + " En este enlace podrás ver más información: https://bit.ly/332wR1G");
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
                    { text: "Resúmenes Diarios" }
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

//Resumen de los avisos.

bot.hears("Resumen de los avisos", ctx =>{
    bot.telegram.sendMessage(ctx.chat.id, "17/02/2022" + "\n\n" + "PUNTUALIDAD" + "\n" + "Pueden abrir el siguiente enlace (https://gvaedu.sharepoint.com/:b:/s/DOCUMENTAR-46012963-ConsejoEscolar/ERDortMcRwZCoUpbhRiAd4kB2sDjkjEs1QjoH9AmyAjirA?e=qeUp0z) para leer la comunicación del centro sobre puntualidad. Un saludo",

    {
        reply_markup: {
            remove_keyboard: true,
        }
    })
})

//Faltas de los profesores

bot.hears("Faltas de los profesores", ctx =>{

    const avisosMessage = ctx.from.first_name + ", selecciona una opción.";

    bot.telegram.sendMessage(ctx.chat.id, avisosMessage, {
        reply_markup: {
            inline_keyboard: [

                [
                    { text: "Futuras faltas", callback_data: "futuras_faltas" }
                ],

                [
                    { text: "Faltas pasadas", callback_data: "pasadas_faltas" }
                ]

            ]
        }
    })

    bot.action("futuras_faltas", ctx => {
        ctx.answerCbQuery(); //para quitar el icono de cargando del botón
        bot.telegram.sendMessage(ctx.chat.id, "FUTURAS FALTAS NOTIFICADAS 🔔" + "\n\n" + "Sin futuras faltas que mostrar")
    })

    bot.action("pasadas_faltas", ctx =>  {
        ctx.answerCbQuery(); //para quitar el icono de cargando del botón
        bot.telegram.sendMessage(ctx.chat.id, "FALTAS PASADAS 🔔" + "\n\n" + "28/10/21 - Jueves" + "\n\n" + " - Música" 
        + "\n\n" + "FALTAS PASADAS 🔕" + "\n\n" + "28/10/21 - Jueves" + "\n\n" + " - Música")
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

//Días Festivos.

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

//Resúmenes Diarios

function sendResumenMessage (ctx) {
    const Fecha_Resumen = ", selecciona una fecha 📆"

    bot.telegram.sendMessage(ctx.chat.id, ctx.from.first_name + Fecha_Resumen, {
        reply_markup: {
            inline_keyboard: [

                    [
                        { text: date_today + " (Today)", callback_data: "ver-resumen"},
                        { text: date_yesterday + " (Yesterday)", callback_data: "resumen-ayer"}
                    ],

                    [
                        { text: date_before_yesterday + " (Before yesterday)", callback_data: "resumen-antesdeayer"},
                    ]
                ]
            }
        }) 
}

bot.hears(["Resúmenes Diarios", "Resumen", "resumen", "resumen de hoy", "Resumen de hoy"], ctx => {
    sendResumenMessage(ctx);
})


//Otros

bot.hears("Otros", ctx =>{
    bot.telegram.sendMessage(ctx.chat.id, "17/02/2022" + "\n\n" + "PUNTUALIDAD" + "\n" + "Pueden abrir el siguiente enlace (https://gvaedu.sharepoint.com/:b:/s/DOCUMENTAR-46012963-ConsejoEscolar/ERDortMcRwZCoUpbhRiAd4kB2sDjkjEs1QjoH9AmyAjirA?e=qeUp0z) para leer la comunicación del centro sobre puntualidad. Un saludo",
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

bot.command('asignaturas', ctx => {

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
                    { text: "Música"}
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
                    { text: "Inlés" }
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
                    { text: "Música"}
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
    const matematicas_mess = "Nombre: Unknow" + "\n" + "✅ Email: Unknow";

    bot.telegram.sendMessage(ctx.chat.id, matematicas_mess, {
        reply_markup: {
            inline_keyboard: [

                    [
                        { text: "Más información", callback_data: "info_mates"}
                    ]

                ]
            }
        })
    })

    bot.action('info_mates', ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón.

    const menuMessage = ctx.from.first_name + "," + " seleccione una opción" + "\n" + "⬇️⬇️⬇️⬇️⬇️"
        bot.telegram.sendMessage(ctx.chat.id,  menuMessage, {
            reply_markup: {
                inline_keyboard: [
    
                        [
                            { text: "Faltas", callback_data: "faltas_mates"},
                            { text: "Horario de tutoría", callback_data: "tutoría_mates"}

                        ]
    
                    ]
                }
            }) 
        }) 

        bot.action('faltas_mates', ctx => {
            ctx.answerCbQuery(); //para quitar el icono de cargando del botón.

            bot.telegram.sendMessage(ctx.chat.id, "✅ No faults yet...")

        })

        
        bot.action('tutoría_mates', ctx => {
            ctx.answerCbQuery(); //para quitar el icono de cargando del botón.

            bot.telegram.sendMessage(ctx.chat.id, "⏰ Martes, de 11:00 a 11:50 h.")

        })



//Castellano.

bot.hears('Castellano', ctx => {

    const castellano_mess = "Nombre: Unknow" + "\n" + "⚠️ Email: Unknow";

    bot.telegram.sendMessage(ctx.chat.id, castellano_mess, {
        reply_markup: {
            inline_keyboard: [

                    [
                        { text: "Más información", callback_data: "info_caste"}
                    ]

                ]
            }
        })
    })

    bot.action('info_caste', ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón.

    const menuMessage = ctx.from.first_name + "," + " seleccione una opción" + "\n" + "⬇️⬇️⬇️⬇️⬇️"
        bot.telegram.sendMessage(ctx.chat.id,  menuMessage, {
            reply_markup: {
                inline_keyboard: [
    
                        [
                            { text: "Faltas", callback_data: "faltas_caste"},
                            { text: "Horario de tutoría", callback_data: "tutoría_caste"}

                        ]
    
                    ]
                }
            }) 
        }) 

        bot.action('faltas_caste', ctx => {
            ctx.answerCbQuery(); //para quitar el icono de cargando del botón.

            bot.telegram.sendMessage(ctx.chat.id, "✅ No faults yet...")

        })

        
        bot.action('tutoría_caste', ctx => {
            ctx.answerCbQuery(); //para quitar el icono de cargando del botón.

            bot.telegram.sendMessage(ctx.chat.id, "⏰ Martes, de 09:40 a 10:30 h.")

        })

//Física y Química

bot.hears('Física y Química', ctx => {
    const fq_mess = "Nombre: Unknow" + "\n" + "⚠️ Email: Unknow";

    bot.telegram.sendMessage(ctx.chat.id, fq_mess, {
        reply_markup: {
            inline_keyboard: [

                    [
                        { text: "Más información", callback_data: "info_fq"}
                    ]

                ]
            }
        })
    })

    bot.action('info_fq', ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón.

    const menuMessage = ctx.from.first_name + "," + " seleccione una opción" + "\n" + "⬇️⬇️⬇️⬇️⬇️"
        bot.telegram.sendMessage(ctx.chat.id,  menuMessage, {
            reply_markup: {
                inline_keyboard: [
    
                        [
                            { text: "Faltas", callback_data: "faltas_fq"},
                            { text: "Horario de tutoría", callback_data: "tutoría_fq"}

                        ]
    
                    ]
                }
            }) 
        }) 


        bot.action('faltas_fq', ctx => {
            ctx.answerCbQuery(); //para quitar el icono de cargando del botón.

            bot.telegram.sendMessage(ctx.chat.id, "🔕 FALTAS NO NOTIFICADAS" + "\n\n" + "Total: 0" + "\n\n" + "🔔 FALTAS NOTIFICADAS" + "\n\n" + " - 21/03/2022" + "\n\n" + " - 24/03/2022" + "\n\n" + "Total: 2" + "\n\n" + "📊 Faltas totales: 2")

        })

        
        bot.action('tutoría_fq', ctx => {
            ctx.answerCbQuery(); //para quitar el icono de cargando del botón.

            bot.telegram.sendMessage(ctx.chat.id, "⏰ Martes, de 09:40 a 10:30 h.")

        })


//Educación Física

bot.hears('Educación Física', ctx => {
const ef_mess = "Nombre: Unknow" + "\n" + "⚠️ Email: Unknow";

bot.telegram.sendMessage(ctx.chat.id, ef_mess, {
    reply_markup: {
        inline_keyboard: [

                [
                    { text: "Más información", callback_data: "info_ef"}
                ]

            ]
        }
    })
})

bot.action('info_ef', ctx => {
ctx.answerCbQuery(); //para quitar el icono de cargando del botón.

const menuMessage = ctx.from.first_name + "," + " seleccione una opción" + "\n" + "⬇️⬇️⬇️⬇️⬇️"
    bot.telegram.sendMessage(ctx.chat.id,  menuMessage, {
        reply_markup: {
            inline_keyboard: [

                    [
                        { text: "Faltas", callback_data: "faltas_ef"},
                        { text: "Horario de tutoría", callback_data: "tutoría_ef"}

                    ]

                ]
            }
        }) 
    }) 

    bot.action('faltas_ef', ctx => {
        ctx.answerCbQuery(); //para quitar el icono de cargando del botón.

        bot.telegram.sendMessage(ctx.chat.id, "🔕 FALTAS NO NOTIFICADAS" + "\n\n" + " - 21/03/2022" + "\n\n" + "Total: 1" + "\n\n" + "🔔 FALTAS NOTIFICADAS" + "\n\n" + "Total: 0" + "\n\n" + "📊 Faltas totales: 1")

    })

    
    bot.action('tutoría_ef', ctx => {
        ctx.answerCbQuery(); //para quitar el icono de cargando del botón.

        bot.telegram.sendMessage(ctx.chat.id, "⏰ Martes, de 09:40 a 10:30 h.")

    })

//Biología y Geología

bot.hears('Biología y Geología', ctx => {
    const bg_mess = "Nombre: Unknow" + "\n" + "⚠️ Email: Unknow"

    bot.telegram.sendMessage(ctx.chat.id, bg_mess, {
        reply_markup: {
            inline_keyboard: [
    
                    [
                        { text: "Más información", callback_data: "info_bg"}
                    ]
    
                ]
            }
        })
    })
    
    bot.action('info_bg', ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón.
    
    const menuMessage = ctx.from.first_name + "," + " seleccione una opción" + "\n" + "⬇️⬇️⬇️⬇️⬇️"
        bot.telegram.sendMessage(ctx.chat.id,  menuMessage, {
            reply_markup: {
                inline_keyboard: [
    
                        [
                            { text: "Faltas", callback_data: "faltas_bg"},
                            { text: "Horario de tutoría", callback_data: "tutoría_bg"}
    
                        ]
    
                    ]
                }
            }) 
        }) 
    
        bot.action('faltas_bg', ctx => {
            ctx.answerCbQuery(); //para quitar el icono de cargando del botón.
    
            bot.telegram.sendMessage(ctx.chat.id, "🔕 FALTAS NO NOTIFICADAS" + "\n\n" + " - 21/02/2022" + "\n\n" + "Total: 1" + "\n\n" + "🔔 FALTAS NOTIFICADAS" + "\n\n" + "Total: 0" + "\n\n" + "📊 Faltas totales: 1")
    
        })
    
        
        bot.action('tutoría_bg', ctx => {
            ctx.answerCbQuery(); //para quitar el icono de cargando del botón.
    
            bot.telegram.sendMessage(ctx.chat.id, "⏰ Martes, de 11:00 a 11:50 h.")
    
        })

//Valenciano

bot.hears('Valenciano', ctx => {
    const valen_mess = "Nombre: Unknow" + "\n" + "⚠️ Email: Unknow";

    bot.telegram.sendMessage(ctx.chat.id, valen_mess, {
        reply_markup: {
            inline_keyboard: [
    
                    [
                        { text: "Más información", callback_data: "info_valen"}
                    ]
    
                ]
            }
        })
    })
    
    bot.action('info_valen', ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón.
    
    const menuMessage = ctx.from.first_name + "," + " seleccione una opción" + "\n" + "⬇️⬇️⬇️⬇️⬇️"
        bot.telegram.sendMessage(ctx.chat.id,  menuMessage, {
            reply_markup: {
                inline_keyboard: [
    
                        [
                            { text: "Faltas", callback_data: "faltas_valen"},
                            { text: "Horario de tutoría", callback_data: "tutoría_valen"}
    
                        ]
    
                    ]
                }
            }) 
        }) 
    
        bot.action('faltas_valen', ctx => {
            ctx.answerCbQuery(); //para quitar el icono de cargando del botón.
    
            bot.telegram.sendMessage(ctx.chat.id, "🔕 FALTAS NO NOTIFICADAS" + "\n\n" + " - 15/02/2022" + "\n\n" + "Total: 1" + "\n\n" + "🔔 FALTAS NOTIFICADAS" + "\n\n" + "Total: 0" + "\n\n" + "📊 Faltas totales: 1")
    
        })
    
        
        bot.action('tutoría_valen', ctx => {
            ctx.answerCbQuery(); //para quitar el icono de cargando del botón.
    
            bot.telegram.sendMessage(ctx.chat.id, "⏰ Miércoles, de 18:25 a 19:15 h.")
    
        })

//Geografía e Historia

bot.hears('Geografía e Historia', ctx => {
    const gh_mess = "Nombre: Unknwo" + "\n" + "✅ Email: Unknow"
    
    bot.telegram.sendMessage(ctx.chat.id, gh_mess, {
        reply_markup: {
            inline_keyboard: [
    
                    [
                        { text: "Más información", callback_data: "info_gh"}
                    ]
    
                ]
            }
        })
    })
    
    bot.action('info_gh', ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón.
    
    const menuMessage = ctx.from.first_name + "," + " seleccione una opción" + "\n" + "⬇️⬇️⬇️⬇️⬇️"
        bot.telegram.sendMessage(ctx.chat.id,  menuMessage, {
            reply_markup: {
                inline_keyboard: [
    
                        [
                            { text: "Faltas", callback_data: "faltas_gh"},
                            { text: "Horario de tutoría", callback_data: "tutoría_gh"}
    
                        ]
    
                    ]
                }
            }) 
        }) 
    
        bot.action('faltas_gh', ctx => {
            ctx.answerCbQuery(); //para quitar el icono de cargando del botón.
    
            bot.telegram.sendMessage(ctx.chat.id, "✅ No faults yet...")
    
        })
    
        
        bot.action('tutoría_gh', ctx => {
            ctx.answerCbQuery(); //para quitar el icono de cargando del botón.
    
            bot.telegram.sendMessage(ctx.chat.id, "⏰ Viernes, de 09:40 a 10:30 h.")
    
        })

//Inglés

bot.hears('Inglés', ctx => {
    const english_mess = "Nombre: Unknow" + "\n" + "⚠️ Email: Unknow";

    bot.telegram.sendMessage(ctx.chat.id, english_mess, {
        reply_markup: {
            inline_keyboard: [
    
                    [
                        { text: "Más información", callback_data: "info_english"}
                    ]
    
                ]
            }
        })
    })
    
    bot.action('info_english', ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón.
    
    const menuMessage = ctx.from.first_name + "," + " seleccione una opción" + "\n" + "⬇️⬇️⬇️⬇️⬇️"
        bot.telegram.sendMessage(ctx.chat.id,  menuMessage, {
            reply_markup: {
                inline_keyboard: [
    
                        [
                            { text: "Faltas", callback_data: "faltas_english"},
                            { text: "Horario de tutoría", callback_data: "tutoría_english"}
    
                        ]
    
                    ]
                }
            }) 
        }) 
    
        bot.action('faltas_english', ctx => {
            ctx.answerCbQuery(); //para quitar el icono de cargando del botón.
    
            bot.telegram.sendMessage(ctx.chat.id, "🔕 FALTAS NO NOTIFICADAS" + "\n\n" + " - 15/02/2022" + "\n\n" + "Total: 1" + "\n\n" + "🔔 FALTAS NOTIFICADAS" + "\n\n" + "Total: 0" + "\n\n" + "📊 Faltas totales: 1")
    
        
        bot.action('tutoría_english', ctx => {
            ctx.answerCbQuery(); //para quitar el icono de cargando del botón.
    
            bot.telegram.sendMessage(ctx.chat.id, "⏰ Miércoles, de 18:25 a 19:15 h.")
    
        })

//Música

bot.hears('Música', ctx => {
    const mus_mess = "Nombre: Unknow" + "\n" + "✅ Email: Unknow";

    bot.telegram.sendMessage(ctx.chat.id, mus_mess, {
        reply_markup: {
            inline_keyboard: [
    
                    [
                        { text: "Más información", callback_data: "info_mus"}
                    ]
    
                ]
            }
        })
    })
    
    bot.action('info_mus', ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón.
    
    const menuMessage = ctx.from.first_name + "," + " seleccione una opción" + "\n" + "⬇️⬇️⬇️⬇️⬇️"
        bot.telegram.sendMessage(ctx.chat.id,  menuMessage, {
            reply_markup: {
                inline_keyboard: [
    
                        [
                            { text: "Faltas", callback_data: "faltas_mus"},
                            { text: "Horario de tutoría", callback_data: "tutoría_mus"}
    
                        ]
    
                    ]
                }
            }) 
        }) 
    
        bot.action('faltas_mus', ctx => {
            ctx.answerCbQuery(); //para quitar el icono de cargando del botón.
    
            bot.telegram.sendMessage(ctx.chat.id, "✅ No faults yet...")
    
        })
    
        
        bot.action('tutoría_mus', ctx => {
            ctx.answerCbQuery(); //para quitar el icono de cargando del botón.
    
            bot.telegram.sendMessage(ctx.chat.id, "⏰ Miércoles, de 17:35 a 18:25 h.")
    
        })

//Plástica
bot.hears("Plástica", ctx => {
    const plástica_mess = "Nombre: Unknow" + "\n" + "⚠️ Email: Unknow";

    bot.telegram.sendMessage(ctx.chat.id, plástica_mess, {
        reply_markup: {
            inline_keyboard: [
    
                    [
                        { text: "Más información", callback_data: "info_plástica"}
                    ]
    
                ]
            }
        })
    })
    
    bot.action('info_mus', ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón.
    
    const menuMessage = ctx.from.first_name + "," + " seleccione una opción" + "\n" + "⬇️⬇️⬇️⬇️⬇️"
        bot.telegram.sendMessage(ctx.chat.id,  menuMessage, {
            reply_markup: {
                inline_keyboard: [
    
                        [
                            { text: "Faltas", callback_data: "faltas_plástica"},
                            { text: "Horario de tutoría", callback_data: "tutoría_plástica"}
    
                        ]
    
                    ]
                }
            }) 
        }) 
    
        bot.action('faltas_plástica', ctx => {
            ctx.answerCbQuery(); //para quitar el icono de cargando del botón.
    
            bot.telegram.sendMessage(ctx.chat.id, "✅ No faults yet...")
    
        })
    
        
        bot.action('tutoría_plástica', ctx => {
            ctx.answerCbQuery(); //para quitar el icono de cargando del botón.
    
            bot.telegram.sendMessage(ctx.chat.id, "⏰ Lunes, de 08:50 a 09:40 h.")
    
        })
})

//Valores Éticos

bot.hears('Valores Éticos', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Nombre: Unknow" + "\n" + "⚠️ Email: Unknow")
})

//Religión

bot.hears('Religión', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, "Nombre: Unknow" + "\n" + "Email: Unknow")
})

//Música

bot.hears('Música', ctx => {
    const mus_mess = "Nombre: Unknow" + "\n" + "✅ Email: Unknow";

    bot.telegram.sendMessage(ctx.chat.id, mus_mess, {
        reply_markup: {
            inline_keyboard: [

                    [
                        { text: "Más información", callback_data: "info_mus"}
                    ]

                ]
            }
        })
    })

    bot.action('info_mus', ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón.

    const menuMessage = ctx.from.first_name + "," + " seleccione una opción" + "\n" + "⬇️⬇️⬇️⬇️⬇️"
        bot.telegram.sendMessage(ctx.chat.id,  menuMessage, {
            reply_markup: {
                inline_keyboard: [
    
                        [
                            { text: "Faltas", callback_data: "faltas_mus"},
                            { text: "Horario de tutoría", callback_data: "tutoría_mus"}

                        ]
    
                    ]
                }
            }) 
        }) 


        bot.action('faltas_mus', ctx => {
            ctx.answerCbQuery(); //para quitar el icono de cargando del botón.

            bot.telegram.sendMessage(ctx.chat.id, "✅ No faults yet...")

        })

        
        bot.action('tutoría_mus', ctx => {
            ctx.answerCbQuery(); //para quitar el icono de cargando del botón.

            bot.telegram.sendMessage(ctx.chat.id, "⏰ Miércoles, de 17:35 a 18:25 h.")

        })

//ENVIAR MENSAJES A TRAVÉS DEL BOT

var Adrián = "Unknow";
var Horacio = "Unknow";
var Grupo = "Unknow";
var Elena = "Unknow";
var Marcos_U = "Unknow";
var Adriana = "Unknow";
var Marcos_P = "Unknow";
var Falou = "Unknow";
var Aaron = "Unknow";
var Andreu = "Unknow";

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
    bot.telegram.sendMessage(Andreu, mess_proxexámenes1) //Andreu
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
    bot.telegram.sendMessage(Andreu, mess_itaca + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕") //Andreu

})

bot.hears('send_itaca', ctx => {
    bot.telegram.sendMessage(Grupo, mess_itaca + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕") //Grupo 
    bot.telegram.sendMessage(Horacio, mess_itaca + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕") //Horacio (Yo)
    bot.telegram.sendMessage(Adrián, mess_itaca + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕") //Adrián
    bot.telegram.sendMessage(Elena, mess_itaca + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕") //Elena
    bot.telegram.sendMessage(Marcos_U, mess_itaca + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕") //Marcos U.
    bot.telegram.sendMessage(Adriana, mess_itaca + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕") //Adriana
    bot.telegram.sendMessage(Marcos_P, mess_itaca + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕") //Marcos P.
    bot.telegram.sendMessage(Falou, mess_itaca + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕") //Falou
    bot.telegram.sendMessage(Aaron, mess_itaca + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕") //Aaron
    bot.telegram.sendMessage(Andreu, mess_itaca + "\n\n" + "Utiliza /unsubscribe para dejar de recibir estos mensajes 🔕") //Andreu
})

bot.hears('resumen_día', ctx => {

    const menuResumen = "RESUMEN DE HOY " + f.getDate() + "/" + f.getMonth() + "/" + f.getFullYear();

        bot.telegram.sendMessage(Grupo,  menuResumen, { //GRUPO
            reply_markup: {
                inline_keyboard: [
    
                        [
                            { text: "Ver resumen", callback_data: "ver-resumen"}
                        ]
                    ]
                }
            }) 

        bot.telegram.sendMessage(Horacio,  menuResumen, { //HORACIO
            reply_markup: {
                inline_keyboard: [
    
                        [
                            { text: "Ver resumen", callback_data: "ver-resumen"}
                        ]
                    ]
                }
            }) 

        bot.telegram.sendMessage(Adrián,  menuResumen, { //ADRIÁN
            reply_markup: {
                inline_keyboard: [
    
                        [
                            { text: "Ver resumen", callback_data: "ver-resumen"}
                        ]
                    ]
                }
            }) 

            bot.telegram.sendMessage(Elena,  menuResumen, { //ELENA
                reply_markup: {
                    inline_keyboard: [
        
                            [
                                { text: "Ver resumen", callback_data: "ver-resumen"}
                            ]
                        ]
                    }
                }) 

        bot.telegram.sendMessage(Marcos_U,  menuResumen, { //MARCOS_U
            reply_markup: {
                inline_keyboard: [
    
                        [
                            { text: "Ver resumen", callback_data: "ver-resumen"}
                        ]
                    ]
                }
            }) 


        bot.telegram.sendMessage(Adriana,  menuResumen, { //ADRIANA
            reply_markup: {
                inline_keyboard: [
    
                        [
                            { text: "Ver resumen", callback_data: "ver-resumen"}
                        ]
                    ]
                }
            }) 

        bot.telegram.sendMessage(Marcos_P,  menuResumen, { //Marcos_P
            reply_markup: {
                inline_keyboard: [
    
                        [
                            { text: "Ver resumen", callback_data: "ver-resumen"}
                        ]
                    ]
                }
            }) 

        bot.telegram.sendMessage(Falou,  menuResumen, { //FALOU
            reply_markup: {
                inline_keyboard: [
    
                        [
                            { text: "Ver resumen", callback_data: "ver-resumen"}
                        ]
                    ]
                }
            }) 

        bot.telegram.sendMessage(Aaron,  menuResumen, { //AARON
            reply_markup: {
                inline_keyboard: [
    
                        [
                            { text: "Ver resumen", callback_data: "ver-resumen"}
                        ]
                    ]
                }
            }) 

        bot.telegram.sendMessage(Andreu,  menuResumen, { //Andreu
            reply_markup: {
                inline_keyboard: [
    
                        [
                            { text: "Ver resumen", callback_data: "ver-resumen"}
                        ]
                    ]
                }
            }) 
})
bot.action('ver-resumen', ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón

    const Resumen_Día = "🏫 CONTENIDO DADO EN CLASE 📖" + "\n\n" + " - Geografía e Historia: Corrección del examen del Sector Secundario" + "\n\n" + " - Matemáticas: Repaso de problemas (Sistemas de Ecuaciones)"
    + "\n\n" + " - Educación Física: Juegos para practicar 'pilota valenciana'" + "\n\n" + " - Biología y Geología: No ha venido a clase." + "\n\n" + " - Física y Química: Corrección de la ficha"
    + "\n\n" + "___________________________________________________"
    + "\n\n" + "Con el comando /deberes podrás ver todos los exámenes, trabajos, deberes... que han ido mandando." 
    + "\n\n" + "Si has encontrado algún error o añadirías algo a este resumen, puedes decirlo desde '/sugerencias' o enviándome un mensaje (@horacio507)"
    + "\n\n" + "Si quieres dejar de recibir estos resúmenes comunícamelo (@horacio507). Siempre que quieras puedes volver a recibirlos."
    + "\n\n" + "HMLA1_BOT";

    bot.telegram.sendMessage(ctx.chat.id, Resumen_Día)
})

bot.action('resumen-ayer', ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón

    const Resumen_Día = "🏫 CONTENIDO DADO EN CLASE 📖" + "\n\n" + "✔️ No data yet..."
    + "\n\n" + "___________________________________________________"
    + "\n\n" + "Con el comando /deberes podrás ver todos los exámenes, trabajos, deberes... que han ido mandando." 
    + "\n\n" + "Si has encontrado algún error o añadirías algo a este resumen, puedes decirlo desde '/sugerencias' o enviándome un mensaje (@horacio507)"
    + "\n\n" + "HMLA1_BOT";

    bot.telegram.sendMessage(ctx.chat.id, Resumen_Día)
})

bot.action('resumen-antesdeayer', ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón

    const Resumen_Día = "🏫 CONTENIDO DADO EN CLASE 📖" + "\n\n" + "✔️ No data yet..."
    + "\n\n" + "___________________________________________________"
    + "\n\n" + "Con el comando /deberes podrás ver todos los exámenes, trabajos, deberes... que han ido mandando." 
    + "\n\n" + "Si has encontrado algún error o añadirías algo a este resumen, puedes decirlo desde '/sugerencias' o enviándome un mensaje (@horacio507)"
    + "\n\n" + "HMLA1_BOT";

    bot.telegram.sendMessage(ctx.chat.id, Resumen_Día)
})

//Mensaje de prueba
bot.hears('send_prueba', ctx => {
    bot.telegram.sendMessage(Horacio, all)
})

 bot.hears('send_confirmation', ctx => {
    bot.telegram.sendMessage(Horacio, "¡Hola, " + ctx.from.first_name + "! Te has suscrito correctamente a los avisos del bot")
 })

//EVENTOS

//RESUMEN DEL 2ND TRIMESTRE

var resumen_2nd_trimestre = "FIN DEL 2ND TRIMESTRE" + "\n\n" + "Bueno, pues acabamos de superar este 2nd trimestre 2️⃣"

bot.hears('resumen_trimestre', ctx => {
    const id_chat = ctx.message.chat.id;
    const photo1 = "https://drive.google.com/file/d/1Uo9IPOmsb37TM1BOTFR0pDuoVv--ykEM/view?usp=sharing";
    const photo2 = "https://drive.google.com/file/d/17w4HQn4d01rpvbXa-0G4uOsf4xB-cQj4/view?usp=sharing";

    ctx.telegram.sendPhoto(id_chat, photo1, {caption: "Ver más detalles: https://www.notion.so/Deberes-f6f904e0fb0e49019a8db836dc524fdf#fe80695ef3054f36a46499640a5c1a82"});
//   ctx.telegram.sendPhoto(id_chat, photo2, {caption: "Ver más detalles: https://www.notion.so/Deberes-f6f904e0fb0e49019a8db836dc524fdf#fe80695ef3054f36a46499640a5c1a82"]); //e
});

var all = "ℹ️ NOVEDADES EN EL BOT ℹ️" + "\n\n" + "Hola a tod@s!" + "\n" + "He añadido dos nuevas características al bot." + "\n\n" + "1️⃣: /everyone - Con este comando las personas con permisos especiales podrán enviar un mensaje a tod@s por el bot."
+ "\n" + "Su uso es muy sencillo. Sólo tienes que poner /everyone y a continuación el mensaje. Ej: /everyone Hola!"
+ "\n\n" + "2️⃣: /report - Ahora podrás reportar un error desde el propio bot, sin necesidad de formularios." + "\n" + "Su uso es muy simple, solamente tienes que escribir /report y a continuación el error. Ej: /report Hay un fallo en..." 
+ "\n\n" + "HMLA1_BOT";

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
    bot.telegram.sendMessage(Andreu, all) // Andreu
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

//ANUNCIAR

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

//anunciar-desde-el-bot

bot.command("everyone", ctx => {
    if (ctx.chat.id == Horacio || ctx.chat.id == Adrián){

        msg = ctx.message.text

        msgArray = msg.split(' ') //función que divide todas las palabras con un espacio.
        msgArray.shift() //Elimina la primera palabra (el comando /report)
        anunciarMsg = msgArray.join(' ') //une el resto de palabras

        bot.telegram.sendMessage(ctx.chat.id, "¿Quieres enviar este mensaje?" + "\n\n" + anunciarMsg, {
            reply_markup: {
                inline_keyboard: [
    
                        [
                            { text: "✅", callback_data: "confirmar_anuncio"}
                        ],

                        [
                            { text: "❌", callback_data: "abortar_anuncio" }
                        ]
                    ]
                }            
        })

        bot.action("confirmar_anuncio", ctx => {
            ctx.answerCbQuery(); //para quitar el icono de cargando del botón.

           // bot.telegram.sendMessage(Adrián, "📢 ANUNCIO DE LOS DELEGADOS 📢" + "\n\n" + anunciarMsg)
            bot.telegram.sendMessage(Horacio, "📢 ANUNCIO DE LOS DELEGADOS 📢" + "\n\n" + anunciarMsg)
            bot.telegram.sendMessage(Grupo, "📢 ANUNCIO DE LOS DELEGADOS 📢" + "\n\n" + anunciarMsg)
            bot.telegram.sendMessage(Elena, "📢 ANUNCIO DE LOS DELEGADOS 📢" + "\n\n" + anunciarMsg)
            bot.telegram.sendMessage(Marcos_U, "📢 ANUNCIO DE LOS DELEGADOS 📢" + "\n\n" + anunciarMsg)
            bot.telegram.sendMessage(Adriana, "📢 ANUNCIO DE LOS DELEGADOS 📢" + "\n\n" + anunciarMsg)
            bot.telegram.sendMessage(Marcos_P, "📢 ANUNCIO DE LOS DELEGADOS 📢" + "\n\n" + anunciarMsg)
            bot.telegram.sendMessage(Falou, "📢 ANUNCIO DE LOS DELEGADOS 📢" + "\n\n" + anunciarMsg)
            bot.telegram.sendMessage(Aaron, "📢 ANUNCIO DE LOS DELEGADOS 📢" + "\n\n" + anunciarMsg)
            bot.telegram.sendMessage(Andreu, "📢 ANUNCIO DE LOS DELEGADOS 📢" + "\n\n" + anunciarMsg)  
        })
    
        bot.action("abortar_anuncio", ctx => {
            ctx.answerCbQuery(); //para quitar el icono de cargando del botón.

            bot.telegram.sendMessage(Horacio, "❌ Mensaje no enviado")
        })

    }

    else {
        bot.telegram.sendMessage(ctx.chat.id, "Ups! No tienes acceso para usar este comando ⛔️")
    }


})

//MENSAJES A ENVIAR

//Próximo examen
var mess_proxexámenes = "❗❗ QUEDA 1 DÍA PARA EL EXAMEN DE FÍSICA Y QUÍMICA ❗❗";
var mess_proxexámenes1 = "🔔🔔 QUEDAN 3 DÍAS PARA EL EXAMEN DE INGLÉS 🔔🔔";

//Exámenes lista
var mess_exámenes = "📆 PRÓXIMOS EXÁMENES 📆" + "\n\n" + "Fecha: 15/11/2021" + "\n" + "Geografía: Organización Política y Económica + mapa CCAA" + "\n\n" + "Fecha: 18/11/2021" + "\n" + "Física y Química: Control T.2" + "\n\n" + "Fecha: 19/11/2021" + "\n" + "Inglés: Control T.2" + "\n\n" + "Fecha: 16/11/2021" + "\n" + "Música: Examen práctico" + "\n\n" + "Fecha: 22/11/2021" + "\n" + "Geografía: Control Mapas de Europa y España"
+ "\n\n" + "Fecha: 23/11/2021" + "\n" + "Castellano: Tema 2" + "\n" + "Música: T.1 + T.2";

//Mensajes de Itaca
var mess_itaca = "📩 ÚLTIMO MENSAJE DE ITACA 📩" + "\n\n" + "PREMIS TALIA. Enhorabona al equip de la assignatura optativa d' Arts Escèniques de l'IES (4t ESO)" + "\n\n" + " CERTAMEN COMPITALIA 2022"
+ "\n\n" + "Enhorabona a l'alumnat de 4t ESO de la matèria Arts Escèniques i Dansa i a la seua professora Cristina Morant, per la seua fabulosa adaptació i representació de l'obra la Pau retorna a Atenes (de Rudolf Sirera) al concurs de teatre grecollatí de l'associació Prosopón,celebrat el passat 10 de març a l'IES Sorolla,i que ha estat reconegut amb el"
+ "\n" + "PREMI ESPECIAL EN LA MODALITAT TALIA-ASCLEPI."
+ "\n\n" + "Els premis i diplomes de participació seran lliurats al Festival de Teatre Grecollatí de Sagunt"
+ "\n\n" + "Una vegada més, ... i ja van quatre anys seguits de primers premis i premis especials," + "\n" + "ENHORABONA al nostre equip!"
+ "\n\n" + "Adjuntem llistat complet de modalitats i alumnat premiat al Certamen Compitalia 2022" + "\n" + "https://gvaedu.sharepoint.com/sites/DOCUMENTAR-46012963/Documentos%20compartidos/Premi%20Talia%202022.%20Certamen%20Compitalia/Llistat%20premiats%20Compitalia%202022.pdf"
+ "\n\n" + "Enlace al mensaje original: https://familia.edu.gva.es/wf-front/myitaca/alumno_avisos_wf?tipo=ag&agenda_id=54710250";

//Fecha

var date_today = (f.getDate());
var date_yesterday = (f.getDate() - 1);
var date_before_yesterday = (f.getDate() - 2);
// var date = (f.getFullYear()) + (f.getMonth()) + (f.getDate());


//UPDATE

bot.action("Novedades de la versión 3.0", ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón


    bot.telegram.sendMessage(ctx.chat.id, "Esta versión (3.0) incluye mejoras en el funcionamiento del bot y se ha intentado simplificar más aún el uso del bot." + "\n\n" + "Algunos cambios a destacar son:"
    + "\n" + " - Facilidad al mostrar los deberes: Básicamente ahora no hace falta poner '/deberes' para verlos, puedes incluso preguntarle al bot los deberes literalmente. Ej: ¿Qué deberes hay?, ¿Han mandao algo?..."
    + "\n" + "Hay que tener en cuenta que se han intentado cubrir muchos casos como las faltas ortográficas comunes, abreviaciones, tildes y mayúculas. Por lo que puede que no funcione con todas las frases."
    + "\n\n" + " - Asignaturas: Si no lo sabías, el bot cuenta con una opción que permite saber el nombre y el correo de un profesor/a con sólo poner el nombre de su asignatura. Ej: Matemáticas."
    + "\n" + "Bueno, pues ahora se han añadido opciones nuevas que permiten ver más información como el horario de tutoría del profesor/a y las veces que ha faltado a clase."
    + "\n\n" + "Además, ahora en el menú desplegable del bot al poner '/', se incluye la opción '/asignaturas'."
    + "\n\n" + " - Tips: ¿Tienes dudas de cómo usar el Bot? Pues tienes a tu disposición una sección donde subiré vídeos relacionados con el uso del bot."
    + "\n" + "Para ver estos tutoriales puedes poner '/' y clicar sobre 'tips 💡' o bien poner '/help'")
})

//TIPS

bot.command('help', ctx => {
    
    const menuMessage = "¡Hola, " + ctx.from.first_name + "!" + "\n" + "Aquí encontrarás algunos vídeo-tutoriales interesantes" + "\n" + "⬇️⬇️⬇️⬇️⬇️"
        bot.telegram.sendMessage(ctx.chat.id,  menuMessage, {
            reply_markup: {
                inline_keyboard: [
    
                        [
                            { text: "Notion - Deberes", callback_data: "notion-tips"}
                        ],

                        [
                            { text: "Solicita un vídeo-tutorial", callback_data: "solicitar-video-tutorial"}
                        ]
    
                    ]
                }
            }) 
        })

bot.hears('help', ctx => {

    const menuMessage = "¡Hola, " + ctx.from.first_name + "!" + "\n" + "Aquí encontrarás algunos vídeo-tutoriales interesantes" + "\n" + "⬇️⬇️⬇️⬇️⬇️"
        bot.telegram.sendMessage(ctx.chat.id,  menuMessage, {
            reply_markup: {
                inline_keyboard: [
    
                        [
                            { text: "Notion - Deberes", callback_data: "notion-tips"}
                        ],

                        [
                            { text: "Solicita un vídeo-tutorial", callback_data: "solicitar-video-tutorial"}
                        ]
    
                    ]
                }
            }) 
        })

bot.action("notion-tips", ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón

    const menuMessage = "¡Hola, " + ctx.from.first_name + "!" + "\n" + "Aquí encontrarás algunos vídeo-tutoriales relacionados con Notion" + "\n" + "⬇️⬇️⬇️⬇️⬇️"
        bot.telegram.sendMessage(ctx.chat.id,  menuMessage, {
            reply_markup: {
                inline_keyboard: [
    
                        [
                            { text: "Introducción", callback_data: "introducción"}
                        ]
                    ]
                }
            }) 
        })

bot.action("introducción", ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón.

    bot.telegram.sendMessage(ctx.chat.id, "#1 ¿CÓMO PUEDO VER LOS DEBERES DESDE EL BOT?" + "\n" + "🔽🔽🔽🔽🔽" + "\n" + "https://youtu.be/_wCfCvHEEiM")
})


bot.action("solicitar-video-tutorial", ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón.

    bot.telegram.sendMessage(ctx.chat.id, "Para solicitar un vídeo-tutorial contacta con migo (@horacio507)" + "\n\n" + "Intentaré subirlo lo antes posible 😉")
})

//PRINT

bot.command("print", ctx => {
    var user_print = ctx.chat.id
    var print_accepted = ctx.chat.id

    bot.telegram.sendMessage(ctx.chat.id, "🖨 Bienvenid@ al servicio de impresión urgente." + "\n\n" + "¿Qué quieres hacer?", {
        reply_markup: {
            inline_keyboard: [

                    [
                        { text: "🖨 Imprimir", callback_data: "print-now"}
                    ],

                    [
                        { text: "€ Precios", callback_data: "print-precios"},
                    ],

                    [
                        { text: "🗓 Pagos pendientes", callback_data: "print-pendientes"}
                    ],

                ]
            }
        })


    bot.action("print-now", ctx => {
        ctx.answerCbQuery(); //para quitar el icono de cargando del botón 

        bot.telegram.sendMessage(ctx.chat.id, "⏳ Espere...")

        const menuPrint = "🖨 Servicio de impresión." + "\n\n" + "👤 Usuario: @" + ctx.from.username + "\n\n" + "🔤 Nombre: " + ctx.from.first_name + " " + ctx.from.last_name
        bot.telegram.sendMessage(Horacio, menuPrint, {
            reply_markup: {
                inline_keyboard: [
    
                        [
                            { text: "✅", callback_data: "print-accepted"},
                            { text: "❌", callback_data: "print-rejected"}
                        ]
                    ]
                }
            })
    
    })

    
bot.action("print-accepted", ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón

    bot.telegram.sendMessage(Horacio, "✅ Operación aceptada")

    const Answer_printservice = "✅ Aceptado"

    bot.telegram.sendMessage(user_print, Answer_printservice, {
        reply_markup: {
            inline_keyboard: [

                    [
                        { text: "🖨", callback_data: "print-details"}
                    ]
                ]
            }
        }) 
    })


bot.action("print-details", ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón 

    var numero_de_impersion1 = "Unknow"
    var numero_de_impersion2 = "Unknow"
    var numero_de_impersion3 = "Unknow"
    var numero_de_impersion4 = "Unknow"
    var numero_de_impersion5 = "Unknow"
    var numero_de_impersion6 = "Unknow"
    var numero_de_impersion7 = "Unknow"
    var numero_de_impersion8 = "Unknow"
    bot.telegram.sendMessage(print_accepted, "1️⃣: Envíe un correo a 'horamalean@gmail.com' con el archivo a imprimir"
    + "\n\n" + "2️⃣: En el asunto tienes que incluir exáctamente lo siguiente: " + numero_de_impersion1
    + "\n\n" + "3️⃣: No incluyas ningún texto adicional en el mensaje. Asegúrate de que no tengas ningún mensaje por defecto de tu servicio de mensajería.")
})


bot.action("print-rejected", ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón 

    bot.telegram.sendMessage(Horacio, "❌ Operación rechazada")
    bot.telegram.sendMessage(user_print, "❌ Rechazado")
})


bot.action('print-precios', ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón 

    bot.telegram.sendMessage(ctx.chat.id, "€ PRECIOS" + "\n\n" + "🌈 Hojas a color: 0,10€" + "\n\n" + "⚫️⚪️ Hojas en blanco y negro: 0,05€", {
        reply_markup: {
            inline_keyboard: [

                    [
                        { text: "🖨 Imprimir", callback_data: "print-now"}
                    ]
                ]
            }
    })
})

//PAGOS PENDIENTES


bot.action('print-pendientes', ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón 

    if (ctx.chat.id == Horacio){
    var pagos_Pendientes_Horacio = 0;

        bot.telegram.sendMessage(ctx.chat.id, "🗓 PAGOS PENDIENTES" + "\n\n" + "Horacio." + "\n\n" + "Tiene un total de: " + pagos_Pendientes_Horacio + " pagos pendientes." + "\n\n" + "ℹ️ Recuerda que tienes 1 mes para poder pagar. Sino cumples este plazo, no podrás volver a usar este servicio."
        + "\n\n" + "ℹ️ La información puede tardar en actualizarse.", {
            reply_markup: {
                inline_keyboard: [

                        [
                            { text: "💳 Pagar ahora", callback_data: "print-paypal" }
                        ],

                        [
                            { text: "📥 Descargar factura", callback_data: "print-invoice" }
                        ]
                    ]
                }
        })
    }

    else {
        bot.telegram.sendMessage(ctx.chat.id, "🗓 PAGOS PENDIENTES" + "\n\n" + "Tiene un total de: 0 pagos pendientes." + "\n\n" + "ℹ️ Recuerda que tienes 1 mes para poder pagar. Sino cumples este plazo, no podrás volver a usar este servicio."
        + "\n\n" + "ℹ️ La información puede tardar en actualizarse." , {
            reply_markup: {
                inline_keyboard: [
    
                        [
                            { text: "💳 Pagar ahora", callback_data: "print-paypal"}
                        ]
                    ]
                }
        })
    }
})


bot.action("print-paypal", ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón 

    bot.telegram.sendMessage(ctx.chat.id, "📋 Recibirás una factura para pagar desde PayPal.")

    bot.telegram.sendMessage(Horacio, "PAGO POR PAYPAL" + "\n\n" + "👤 Usuario: @" + ctx.from.username + "\n\n" + "🔤 Nombre: " + ctx.from.first_name + " " + ctx.from.last_name)
})

bot.action("print-invoice", ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón

    if (ctx.chat.id == Horacio){
        const invoice = "https://www.paypal.com/invoice/s/pdf/pay/INV2-PNH6-TVMQ-UJ44-CLNJ?skipAuth=true&removeQr=false&isDownload=true&cache-buster=1648211927207";

        ctx.telegram.sendDocument(ctx.chat.id, invoice)
    }

}) 

})

//CUSTOMIZE
bot.on('sticker', ctx => {
    if (ctx.chat.id != Grupo){
        bot.telegram.sendMessage(ctx.chat.id, "Oh! You like stickers too. 😁")
    }
})

//Tirar una moneda.
function random (number){
    return Math.floor(Math.random() * (number + 1))

}
function moneda (ctx) {
    var moneda = random(2);

    if(moneda == 1){
        bot.telegram.sendMessage(ctx.chat.id, "Ha salido cara 👨")
    }

    else {
        bot.telegram.sendMessage(ctx.chat.id, "Ha salido cruz ❎")
    }
}

function dado (ctx) {
    var dado = random(6);

    if (dado == 1) {
        bot.telegram.sendMessage(ctx.chat.id,"Ha salido 1️⃣")
    }

    if (dado == 2){
        bot.telegram.sendMessage(ctx.chat.id,"Ha salido 2️⃣")
    }

    if (dado == 3){
        bot.telegram.sendMessage(ctx.chat.id,"Ha salido 3️⃣")
    }

    if (dado == 4){
        bot.telegram.sendMessage(ctx.chat.id, "Ha salido 4️⃣")
    }

    if (dado == 5){
        bot.telegram.sendMessage(ctx.chat.id, "Ha salido 5️⃣")
    }

    if (dado == 6){
        bot.telegram.sendMessage(ctx.chat.id, "Ha salido 6️⃣")
    }
}

bot.hears(['Tira una moneda', '🪙', 'Lanza una moneda', 'lanza una moneda', 'Lanzar una moneda', 'lanzar una moneda'], ctx => {
    moneda(ctx);
})

//Lanzar un dado

bot.hears(['Lanzar un dado', 'Tirar un dado', 'Tira un dado', 'Lanza un dado'], ctx => {
    dado(ctx);
})

//Acerca del bot

var version = "3.0";

bot.action('acerca', ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón
    ctx.reply('El proposito de este bot es poder ayudarte a organizarte y actualizarte con avisos y novedades.' + '\n\n' + 'Información detallada del bot'
    + '\n\n' + 'Creador: @horacio507' + '\n' + 'Versión del bot: ' + version + "\n\n" + "☕ PayPal: paypal.me/HMLA1");
})

bot.command('info', ctx => {
    ctx.reply('El proposito de este bot es poder ayudarte a organizarte y actualizarte con avisos y novedades.' + '\n\n' + 'Información detallada del bot'
    + '\n\n' + 'Creador: @horacio507' + '\n' + 'Versión del bot: ' + version + "\n\n" + "☕ PayPal: paypal.me/HMLA1");
})

bot.command('info@HMLA1_BOT', ctx => {
    ctx.reply('El proposito de este bot es poder ayudarte a organizarte y actualizarte con avisos y novedades.' + '\n\n' + 'Información detallada del bot'
    + '\n\n' + 'Creador: @horacio507' + '\n' + 'Versión del bot: ' + version + "\n\n" + "☕ PayPal: paypal.me/HMLA1");
})


//Comandos

bot.action('comandos', ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón
    ctx.reply("Aquí están algunos de los comandos del bot" + "\n\n" + "Multimedia" + "\n" + "/deberes - Deberes mandados en clase" + "\n" + "/avisos - Avisos, notificaciones..."
    + "\n" + "/sugerencias - formulario para sugerencias sobre la clase o el bot"
    + "\n\n" + "Sobre el bot" + "\n" + "/info - Información sobre el bot");
})



bot.launch();
