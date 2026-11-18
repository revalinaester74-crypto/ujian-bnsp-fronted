import React, { useEffect, useState } from 'react';

const API = 'http://localhost:5000/api/siswa';

function App() {
    const [siswa, setSiswa] = useState([]);
    const [form, setForm] = useState({
        kode_siswa: '',
        nama_siswa: '',
        alamat_siswa: '',
        tgl_siswa: '',
        jurusan_siswa: ''
    });

    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);

    // AMBIL DATA SISWA
    const getData = async () => {
        try {
            const response = await fetch(API);
            if (!response.ok) throw new Error('Gagal mengambil data');
            const data = await response.json();
            setSiswa(data);
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    // INPUT FORM
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // SIMPAN DATA
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(
                edit ? `${API}/${encodeURIComponent(form.kode_siswa)}` : API,
                {
                    method: edit ? 'PUT' : 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(form)
                }
            );

            const result = await response.json();

            if (!response.ok) throw new Error(result.message);

            alert(edit ? 'Data berhasil diubah!' : 'Data berhasil ditambahkan!');

            resetForm();
            getData();
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    // EDIT DATA
    const handleEdit = (data) => {
        setForm({
            kode_siswa: data.kode_siswa,
            nama_siswa: data.nama_siswa,
            alamat_siswa: data.alamat_siswa,
            tgl_siswa: String(data.tgl_siswa).slice(0, 10),
            jurusan_siswa: data.jurusan_siswa
        });

        setEdit(true);
    };

    // HAPUS DATA
    const handleDelete = async (kode) => {
        if (!window.confirm('Yakin ingin menghapus data ini?')) return;

        try {
            const response = await fetch(
                `${API}/${encodeURIComponent(kode)}`,
                { method: 'DELETE' }
            );

            const result = await response.json();

            if (!response.ok) throw new Error(result.message);

            alert('Data berhasil dihapus!');
            getData();
        } catch (error) {
            alert(error.message);
        }
    };

    // RESET FORM
    const resetForm = () => {
        setForm({
            kode_siswa: '',
            nama_siswa: '',
            alamat_siswa: '',
            tgl_siswa: '',
            jurusan_siswa: ''
        });

        setEdit(false);
    };

    return (
        <div className="container">

            <header className="header">
                <h1>DATA SISWA</h1>
                <p>Sistem Informasi Manajemen Data Siswa</p>
            </header>

            <div className="content">

                {/* FORM SISWA */}
                <section className="form-card">
                    <h2>{edit ? 'Edit Data Siswa' : 'Tambah Data Siswa'}</h2>

                    <form onSubmit={handleSubmit}>

                        <label>Kode Siswa</label>
                        <input
                            type="text"
                            name="kode_siswa"
                            placeholder="Masukkan kode siswa"
                            value={form.kode_siswa}
                            onChange={handleChange}
                            disabled={edit}
                            required
                        />

                        <label>Nama Siswa</label>
                        <input
                            type="text"
                            name="nama_siswa"
                            placeholder="Masukkan nama siswa"
                            value={form.nama_siswa}
                            onChange={handleChange}
                            required
                        />

                        <label>Alamat Siswa</label>
                        <textarea
                            name="alamat_siswa"
                            placeholder="Masukkan alamat siswa"
                            value={form.alamat_siswa}
                            onChange={handleChange}
                            required
                        />

                        <label>Tanggal Lahir</label>
                        <input
                            type="date"
                            name="tgl_siswa"
                            value={form.tgl_siswa}
                            onChange={handleChange}
                            required
                        />

                        <label>Jurusan Siswa</label>
                        <input
                            type="text"
                            name="jurusan_siswa"
                            placeholder="Masukkan jurusan siswa"
                            value={form.jurusan_siswa}
                            onChange={handleChange}
                            required
                        />

                        <button type="submit" disabled={loading}>
                            {loading ? 'Menyimpan...' : edit ? 'Update Data' : 'Tambah Data'}
                        </button>

                        {edit && (
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={resetForm}
                            >
                                Batal
                            </button>
                        )}

                    </form>
                </section>

                {/* TABEL SISWA */}
                <section className="table-card">
                    <div className="table-header">
                        <h2>Daftar Siswa</h2>
                        <span>Total: {siswa.length} Siswa</span>
                    </div>

                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Kode Siswa</th>
                                    <th>Nama Siswa</th>
                                    <th>Alamat</th>
                                    <th>Tanggal Lahir</th>
                                    <th>Jurusan</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>

                            <tbody>
                                {siswa.length > 0 ? (
                                    siswa.map((item, index) => (
                                        <tr key={item.kode_siswa}>
                                            <td>{index + 1}</td>
                                            <td>{item.kode_siswa}</td>
                                            <td>{item.nama_siswa}</td>
                                            <td>{item.alamat_siswa}</td>
                                            <td>{String(item.tgl_siswa).slice(0, 10)}</td>
                                            <td>{item.jurusan_siswa}</td>
                                            <td>
                                                <button
                                                    className="edit-btn"
                                                    onClick={() => handleEdit(item)}
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="delete-btn"
                                                    onClick={() => handleDelete(item.kode_siswa)}
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="empty">
                                            Belum ada data siswa
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <button className="refresh-btn" onClick={getData}>
                        Refresh Data
                    </button>
                </section>

            </div>
        </div>
    );
}

export default App;
