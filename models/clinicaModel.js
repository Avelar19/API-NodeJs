const connection = require('../config/dbConnection');

// Esta função recebe um objeto task como parâmetro, que deve conter propriedades como nome, cnpj, telefone e endereco. 
// A função realiza uma operação de inserção na tabela "clinicas" com os valores fornecidos e retorna a linha recém-criada.
const createClinica = async (task) => {
    const {nome, cnpj, telefone, endereco} = task;
    const [createdClinica] = await connection.execute("INSERT INTO clinicas (nome, cnpj, telefone, endereco) VALUES (?, ?, ?, ?);",  
                                                    [nome, cnpj, telefone, endereco]);
    return createdClinica;
}

const updateClinica = async (id, task) => {
    const { nome, cnpj, telefone, endereco } = task;
    const query = "UPDATE clinicas SET nome = ?, cnpj = ?, telefone = ?, endereco = ? WHERE id = ?;"
    const [updatedClinica] = await connection.execute(query,  [nome, cnpj, telefone, endereco, id]);
    return updatedClinica;
}

const deleteClinica = async (id) => {
    const deletedClinica = await connection.execute("DELETE FROM clinicas WHERE id = ?;",  [id]);
    return deletedClinica;
}

const getAllClinicas = async () => {
    const tasks = await connection.execute("SELECT * FROM clinicas;");
    return tasks[0];
}

/* Criando commit */
module.exports = {
    createClinica,
    updateClinica,
    deleteClinica,
    getAllClinicas
};
