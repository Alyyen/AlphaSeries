function LogInBtn() {

    const login = () => {
        alert('Vous allez être redirigé sur le site de betaseries pour vous connecter.')
        window.location.href = `https://www.betaseries.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=http://localhost:3000/`;
    }

    return (
        <div>
            <button className="btn btn-primary" onClick={() => login()}>
                Se connecter
            </button>
        </div>
    );
}

export default LogInBtn;
