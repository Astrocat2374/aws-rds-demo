const postName = document.querySelector('#post-name');
const postGrade = document.querySelector('#post-grade');
const postSubmit = document.querySelector('#post-submit');

const putName = document.querySelector('#put-name');
const putGrade = document.querySelector('#put-grade');
const putId = document.querySelector('#put-id');
const putSubmit = document.querySelector('#put-submit');

const deleteId = document.querySelector('#delete-id');
const deleteSubmit = document.querySelector('#delete-submit');

postSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    axios
        .post(`https://ytch000b6c.execute-api.us-west-2.amazonaws.com/dev/post`, {
            name: postName.value,
            grade: postGrade.value
        })
        .then((response)=>{
            console.log(response.data.message);
        })
        .catch((error)=>{
            console.log('error', error);
        })
})

putSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    axios
        .put(`https://ytch000b6c.execute-api.us-west-2.amazonaws.com/dev/put`, {
            name: putName.value,
            grade: putGrade.value,
            id: putId.value
        })
        .then((response)=>{
            console.log(response.data.message);
        })
        .catch((error)=>{
            console.log('error', error);
        })
})

deleteSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    axios
        .delete(`https://ytch000b6c.execute-api.us-west-2.amazonaws.com/dev/delete`, {
            data: {id: deleteId.value}
        })
        .then((response)=>{
            console.log(response.data.message);
        })
        .catch((error)=>{
            console.log('error', error);
        })
})

axios
    .get(`https://ytch000b6c.execute-api.us-west-2.amazonaws.com/dev/get`)
    .then((response)=>{
        console.log('get response', response.data.message.rows)
        const render = (response.data.message.rows).map(x=>{
            console.log(x);
            let cardTemplate = `
            <div class = 'card'>
                <p> ${x.name} </p>
                <p> ${x.grade} </p>
            </div>
            `
            let newCard = document.createElement('div');
            newCard.innerHTML = cardTemplate;
            document.querySelector('#result').appendChild(newCard);
        })
    })
    .catch((error)=>{
        console.log('error', error);
    })