<?php
    use PHPMailer\PHPMailer\PHPMailer;

    if (isset($_POST['name']) && isset ($_POST['email'])) {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $subject = $_POST['subject'];
        $body = $_POST['body'];
        
        require_once "PHPMailer/PHPMailer.php";
        require_once "PHPMailer/SMTP.php";
        require_once "PHPMailer/Exception.php";

        $mail = new PHPMailer();

        // SMTP settings
        $mail->isSMTP();
        $mail->Host = "smtp.mail.com.br";
        $mail->SMTPAuth = true;
        $mail->Username = "contato@mail.com.br";
        $mail->Password = '########';
        $mail->Port = 465; // 587
        $mail->SMTPSecure = "ssl"; // tls

        // Email Settings
        $mail->isHTML(true);
        $mail->CharSet = 'utf-8';
        $mail->setFrom($email, $name);
        $mail->addAddress("contato@mail.com.br");
        $mail->Subject = $subject;
        $mail->Body = "Nome: ".$name.'<br>'."Email: ".$email.'<br>'."Assunto: ".$subject.'<br>'."Mensagem: ".$body;

        if ($mail->send()) {
            $status = "success";
            $response = "Email enviado";
        } else {
            $status = "failled";
            $response = "Algo de errado aconteceu <br><br>" . $mail->ErrorInfo;
        }
        exit(json_encode(array("status"=>$status,"response"=>$response)));
    }
?>