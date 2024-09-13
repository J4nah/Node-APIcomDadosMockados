const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

//banco de dados mockado
let escola = [
    {
        ra: '1',
        nome: "João",
        disciplinas: [
            { codigo: "MAT101", nome: "Matemática", professor: "Prof. Carlos" },
            { codigo: "HIS101", nome: "História", professor: "Prof. Ana" },
            { codigo: "POR101", nome: "Português", professor: "Prof. João" },
            { codigo: "GEO101", nome: "Geografia", professor: "Prof. Ana" }
        ]
    },
    {
        ra: '2',
        nome: "Maria",
        disciplinas: [
            { codigo: "MAT101", nome: "Matemática", professor: "Prof. Carlos" },
            { codigo: "HIS101", nome: "História", professor: "Prof. Ana" },
            { codigo: "GEO101", nome: "Geografia", professor: "Prof. Ana" }
        ]
    },
    {
        ra: '3',
        nome: "Pedro",
        disciplinas: [
            { codigo: "CIE101", nome: "Ciências", professor: "Prof. João" },
            { codigo: "HIS101", nome: "História", professor: "Prof. Ana" },
            { codigo: "POR101", nome: "Português", professor: "Prof. João" },
            { codigo: "GEO101", nome: "Geografia", professor: "Prof. Ana" },
            { codigo: "EDF101", nome: "Educação Física", professor: "Prof. Carlos" }
        ]
    }
];

// 1 - Exibir todos os alunos 
app.get('/alunos', (req, res) => {
    res.json(escola);
});

// 2 - Buscar um aluno pelo RA 
app.get('/alunos/:ra', (req, res) => {
    const aluno = escola.find(a => a.ra === req.params.ra);
    if (aluno) {
        res.json(aluno);
    } else {
        res.status(404).json({ mensagem: "Aluno não encontrado" });
    }
});

// 3 - Listar todas as disciplinas de um aluno
app.get('/alunos/:ra/disciplinas', (req, res) => {
    const aluno = escola.find(a => a.ra === req.params.ra);
    if (aluno) {
        res.json(aluno.disciplinas);
    } else {
        res.status(404).json({ mensagem: "Aluno não encontrado" });
    }
});

// 4 - Adicionar uma disciplina para um aluno
app.post('/alunos/:ra/disciplinas', (req, res) => {
    const aluno = escola.find(a => a.ra === req.params.ra);
    if (aluno) {
        const novaDisciplina = req.body;
        aluno.disciplinas.push(novaDisciplina);
        res.json({ mensagem: "Disciplina adicionada com sucesso", aluno });
    } else {
        res.status(404).json({ mensagem: "Aluno não encontrado" });
    }
});

// 5 - Atualizar os dados de um aluno
app.put('/alunos/:ra', (req, res) => {
    const alunoIndex = escola.findIndex(a => a.ra === req.params.ra);
    if (alunoIndex !== -1) {
        escola[alunoIndex] = { ...escola[alunoIndex], ...req.body };
        res.json({ mensagem: "Dados do aluno atualizados com sucesso", aluno: escola[alunoIndex] });
    } else {
        res.status(404).json({ mensagem: "Aluno não encontrado" });
    }
});


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
