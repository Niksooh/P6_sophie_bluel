fetch ("http://localhost:5678/api/works").then ((data) => {
    return data.json()
})
.then ((works) => {
    console.log(works)
})

