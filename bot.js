require('dotenv').config()
const { Telegraf } = require('telegraf')
const axios = require('axios');

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

bot.command('/avisos', ctx => {
    sendAvisosMessage(ctx);
})

//Deberes

bot.hears('Deberes', ctx => {
    sendDeberesMessage(ctx);
})

bot.command('deberes', ctx => {
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
                    {text: "Comandos", callback_data: 'comandos'}
                ],

                
                [
                    {text: "Acerca de este bot", callback_data: 'acerca'}
                ]
            ]
        }
    })
}



//Menú de botones para navegar (manera gráfica)

bot.action('menu', ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón
    
    const menuMessage = "Selecciona una opción"
    bot.telegram.sendMessage(ctx.chat.id, menuMessage, {
        reply_markup: {
            keyboard: [
                [
                    { text: "Deberes" },
                    { text: "Horario" },
                    { text: "Avisos" }

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

bot.hears("e", ctx =>{
    bot.telegram.sendMessage(ctx.chat.id, "<strong>bold</strong>", {
        reply_markup: {
            remove_keyboard: true,
        }
    })
})

bot.action('continuar_deberes', ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón
            bot.telegram.sendMessage(ctx.chat.id, "DEBERES SEMANA 27-01" + '\n\n' + 'Sin deberes que mostrar', {

            })
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
    
    const menuMessage = "Selecciona una opción"
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
    bot.telegram.sendMessage(ctx.chat.id, "Sin avisos que mostrar", {
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

//Excursiones

bot.hears("Excursiones", ctx =>{
    bot.telegram.sendMessage(ctx.chat.id, "Sin excursiones que mostrar", {
        reply_markup: {
            remove_keyboard: true,
        }
    })
})

//Otros

bot.hears("Otros", ctx =>{
    bot.telegram.sendMessage(ctx.chat.id, "Sin otros avisos que mostrar", {
        reply_markup: {
            remove_keyboard: true,
        }
    })
})

//Acerca de mi

bot.action('acerca', ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón
    ctx.reply('El proposito de este bot es poder ayudarte a organizarte y actualizarte con avisos y novedades.' + '\n\n' + 'Información detallada del bot'
    + '\n\n' + 'Creador: @horacio507' + '\n' + 'Versión del bot: 1.0' + '\n\n' + '__Esta versión está en desarrllo__');
})

bot.command('info', ctx => {
    ctx.reply('El proposito de este bot es poder ayudarte a organizarte y actualizarte con avisos y novedades.' + '\n\n' + 'Información detallada del bot'
    + '\n\n' + 'Creador: @horacio507' + '\n' + 'Versión del bot: 1.0' + '\n\n' + '__Esta versión está en desarrllo__');
})

//Menú con los comandos (manera comandos)

bot.action('comandos', ctx => {
    ctx.answerCbQuery(); //para quitar el icono de cargando del botón
    ctx.reply('Aquí están todos los comandos del bot\n\n' + "Multimedia\n" + "/deberes - Deberes mandados en clase\n" + "/noticias - Ver las últimas 10 noticias de elJuande.com\n\n"
    + "Sobre el bot\n" + "/info - Quién ha creado este bot\n"
    +"/license - Ver la licencia de Copyright y consultar el código del bot");
})



bot.launch();