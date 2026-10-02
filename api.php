<?php
header('Content-Type: application/json');
$conn = new mysqli("localhost", "root", "", "db_klub_coding_1");
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Koneksi database gagal!"]);
    exit();
}
$action = $_GET['action'] ?? '';
if ($action === 'daftar') {
    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $conn->prepare("INSERT INTO anggota_klub (nis, nama, divisi, email) VALUES 
(?, ?, ?, ?)");
    $stmt->bind_param("ssss", $data['nis'], $data['nama'], $data['divisi'], $data['email']);
    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Selamat, pendaftaran DevClub 
berhasil!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "NIS sudah terdaftar 
sebelumnya!"]);
    }
}
?>