require('dotenv').config();
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (dataSend) => {
 let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure:false,
    auth: {
        user: process.env.EMAIL_APP,
        pass: process.env.EMAIL_APP_PASSWORD,
    },
 });
let info = await transporter.sendMail({
    from:'"VietHoang 👻"<hoanngviet232@gmail.com>',
    to:dataSend.reciverEmail,
    subject:"Thông tin đặt lịch khám bệnh",
    html:getBodyHTMLEmail(dataSend),
});
}

let getBodyHTMLEmail    = (dataSend) => {
    let result =''
    if (dataSend.language === 'vi') {
        result =  
    `
    <h3> Xin chào ${dataSend.patientName}!</h3>
    <p> Bạn nhận được email này vì đã đặt lịch khám bệnh online trên VietHoang TT </p>
    <p> Thông tin đặt lịch khám bệnh </p>
    <div><b> Thời gian:${dataSend.time}</b></div>
    <div><b> Bác sĩ:${dataSend.doctorName}</b></div>

    <p> Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh. </p>
    <div>
    <a href=${dataSend.redirectLink} target= "_blank"> Click here</a>
    </div>
    <div> Xin chân thành cảm ơn </div>
    `
    }
    if (dataSend.language === 'en') {
        result =  
    `
    <h3> Dear ${dataSend.patientName}!</h3>
    <p> You received this email because you booked an online medical appointment on VietHoang TT </p>
    <p> Information to book a medical appointment
 </p>
    <div><b> Time:${dataSend.time}</b></div>
    <div><b> Doctor:${dataSend.doctorName}</b></div>

    <p> If the above information is true, please click on the link below to confirm and complete the procedure to book an appointment.
 </p>
    <div>
    <a href=${dataSend.redirectLink} target= "_blank"> Click here</a>
    </div>
    <div>Sincerely thank </div>
    `
    }
    return result;
}
let getBodyHTMLEmailRemedy = (dataSend) => {
    let result =''
    if (dataSend.language === 'vi'){
        result = 
        `
        <h3> Xin chào ${dataSend.patientName}!</h3>
        <p> Bạn nhận được email này vì đã đặt lịch khám bệnh online trên #VietHoàng </p>
        <p> Thông tin đơn thuốc/hoá đơn được gửi trong file đính kèm.</p>

        <div> Xin chân thành cảm ơn!</div>
        `
    }
    if (dataSend.language === 'en'){
        result = 
        `
        <h3> Dear  ${dataSend.patientName}!</h3>
        <p> You received this email because you booked an online medical appointment on #VietHoang </p>
        <p> Prescription/invoice information is sent in the attached file. </p>

        <div> Sincerely thank!</div>
        `
    }
    return result;
}

let sendAttachment = async (dataSend)=> {
    return new Promise(async(resolve, reject)=>{
        try{
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure:false,
            auth: {
        user: process.env.EMAIL_APP,
        pass: process.env.EMAIL_APP_PASSWORD,
    },
 });
let info = await transporter.sendMail({
    from:'"VietHoang 👻"<hoanngviet232@gmail.com>',
    to:dataSend.email,
    subject:"Kết quả đặt lịch khám bệnh",
    html:getBodyHTMLEmailRemedy(dataSend),
    attachments:[
        {
            filename:`remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
            content: dataSend.imgBase64.split("base64,")[1],
            encoding:'base64'
        },
    ],
});
resolve(true)
}catch(e){
    reject(e)
}
})
}
//   let transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: "gmail", // true for 465, false for other ports
//     auth: {
//       user: process.env.EMAIL_APP, // generated ethereal user
//       pass:  process.env.EMAIL_APP_PASSWORD, // generated ethereal password
//     },
//   });

//   // send mail with defined transport obj232232
//   let info = await transporter.sendMail({
//     from: '"VietHoang 👻" <hoanngviet232@gmail.com>', // sender address
//     to: reciverEmail, // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });



module.exports = {
    sendSimpleEmail:sendSimpleEmail,
    sendAttachment:sendAttachment,
    getBodyHTMLEmailRemedy:getBodyHTMLEmailRemedy
}