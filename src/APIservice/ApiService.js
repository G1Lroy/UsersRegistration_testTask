export class apiRequest {
    static async getUsersList(url = "https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6") {
        const response = await fetch(url)
        const data = await response.json()
        return data;
    }
    static async getPositionList() {
        const response = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
        const data = await response.json()
        return data.positions;
    }
    static async getToken() {
        const response = await fetch("https://frontend-test-assignment-api.abz.agency/api/v1/token")
        const data = await response.json()
        return data.token
    }
    static async postUser(token, formData) {
        const response = await fetch(
            "https://frontend-test-assignment-api.abz.agency/api/v1/users",
            {
                method: "POST",
                body: formData,
                headers: {
                    Token: token,
                },
            }
        );
        const data = await response.json();
        console.log(data);
    }

}