const postName = document.querySelector('#post-name');
const postGrade = document.querySelector('#post-grade');
const postSubmit = document.querySelector('#post-submit');

postSubmit.addEventListener('click', (event) => {
    event.preventDefault();
    console.log(postName.value);
    console.log(postGrade.value);
    axios
        .post(`https://ytch000b6c.execute-api.us-west-2.amazonaws.com/dev/post`, {
            name: postName.value,
            grade: postGrade.value
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