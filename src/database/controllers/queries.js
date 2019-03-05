var queries = {
    addTask: 'INSERT INTO list(task) values($1)',
    getListQuery: "SELECT task FROM list WHERE completed = 'N'",
    getCompletedListQuery: "SELECT task FROM list WHERE completed = 'Y'",
    completeTaskQuery: "UPDATE list SET completed='Y' WHERE task = ANY ($1)"
}

module.exports = queries;