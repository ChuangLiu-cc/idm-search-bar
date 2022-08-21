export class SearchBar {
    constructor(tid, data) {
        this.no_search_result = false;
        this.previous_search_params = { name: "", email: "", phone: "", note: "", arrival: "", departure: "", room: "" };
        this.search_params = { name: "", email: "", phone: "", note: "", arrival: "", departure: "", room: "" };
        //this.tagid = tid;
        this.search_data = data;
        const queryValue = "#" + tid;
        const container = document.querySelector(queryValue);
        const el = document.createElement('div');
        el.innerHTML = `
            <input type="text" name="nameinput" id="nameinput" />
            <input type="email" name="emailinput" id="emailinput" />
            <input type="tel" name="phoneinput" id="phoneinput" />
            <input type="text" name="noteinput" id="noteinput" />
            <input type="date" name="arrival" id="arrivaldp" >
            <input type="date" name="departure" id="departuredp" >
            <select name="roomsize" id="roomsize">
                <option value="business-suite">Business Suite</option>
                <option value="presidential-suite">Presidential Suite</option>
            </select>

            <button id="searchbtn">Search</button>
            <button id="clearbtn">Clear</button>
        `;
        container === null || container === void 0 ? void 0 : container.appendChild(el);
        // const nameInput = <HTMLInputElement>document.getElementById("nameinput");
        // const emailInput = <HTMLInputElement>document.getElementById("emailinput");
        // const phoneInput = <HTMLInputElement>document.getElementById("phoneinput");
        // const noteInput = <HTMLInputElement>document.getElementById("noteinput");
        // const arrivalDp = <HTMLInputElement>document.getElementById("arrivaldp");
        // const departureDp = <HTMLInputElement>document.getElementById("departuredp");
        // const roomsizeSelect = <HTMLInputElement>document.getElementById("roomsize");
        const searchBtnElement = document.querySelector('#searchbtn');
        const clearBtnElement = document.querySelector('#clearbtn');
        searchBtnElement.addEventListener('click', (e) => {
            e.preventDefault();
            this.searchData();
        });
        clearBtnElement.addEventListener('click', (e) => {
            e.preventDefault();
            this.initSearchElement();
        });
    }
    initSearchElement() {
        const clearSearchResult = new CustomEvent("clearSearchResult", { detail: null });
        window.dispatchEvent(clearSearchResult);
        const searchResultFlag = new CustomEvent("searchResultFlag", { detail: false });
        window.dispatchEvent(searchResultFlag);
        const nameInputElement = document.querySelector('#nameinput');
        nameInputElement.value = "";
        const emailInputElement = document.querySelector('#emailinput');
        emailInputElement.value = "";
        const phoneInputElement = document.querySelector('#phoneinput');
        phoneInputElement.value = "";
        const noteInputElement = document.querySelector('#noteinput');
        noteInputElement.value = "";
        const roomsizeElement = document.querySelector('#roomsize');
        roomsizeElement.value = "";
        const arrivalDpElement = document.querySelector('#arrivaldp');
        arrivalDpElement.value = "";
        const departureDpElement = document.querySelector('#departuredp');
        departureDpElement.value = "";
        this.previous_search_params = { name: "", email: "", phone: "", note: "", arrival: "", departure: "", room: "" };
    }
    searchData() {
        //before search
        //get all value from querySelector, then filter data base on each search critirial value
        const nameInputElement = document.querySelector('#nameinput');
        this.search_params.name = nameInputElement.value;
        const emailInputElement = document.querySelector('#emailinput');
        this.search_params.email = emailInputElement.value;
        const phoneInputElement = document.querySelector('#phoneinput');
        this.search_params.phone = phoneInputElement.value;
        const noteInputElement = document.querySelector('#noteinput');
        this.search_params.note = noteInputElement.value;
        const roomsizeElement = document.querySelector('#roomsize');
        this.search_params.room = roomsizeElement.value;
        const arrivalDpElement = document.querySelector('#arrivaldp');
        this.search_params.arrival = arrivalDpElement.value;
        const departureDpElement = document.querySelector('#departuredp');
        this.search_params.departure = departureDpElement.value;
        if (!nameInputElement.value && !emailInputElement.value && !phoneInputElement.value && !noteInputElement.value && !roomsizeElement.value && !arrivalDpElement.value && !departureDpElement.value)
            return;
        if (JSON.stringify(this.previous_search_params) === JSON.stringify(this.search_params))
            return;
        //searching
        this.search_result = this.search_data.filter((d) => {
            return (nameInputElement.value ? (this.isStringInclude(d.firstName, nameInputElement.value) || this.isStringInclude(d.lastName, nameInputElement.value)) : true) &&
                (emailInputElement.value ? this.isStringInclude(d.email, emailInputElement.value) : true) &&
                (phoneInputElement.value ? this.isStringInclude(d.phone, phoneInputElement.value) : true) &&
                (noteInputElement.value ? this.isStringInclude(d.note, noteInputElement.value) : true) &&
                (roomsizeElement.value ? this.isStringInclude(d.room.roomSize, roomsizeElement.value) : true) &&
                (arrivalDpElement.value ? this.isDateEqual(d.stay.arrivalDate, arrivalDpElement.value) : true) &&
                (departureDpElement.value ? this.isDateEqual(d.stay.departureDate, departureDpElement.value) : true);
        });
        this.previous_search_params = JSON.parse(JSON.stringify(this.search_params));
        //use event emitter to pass data to main page
        if (this.search_result.length == 0) {
            this.no_search_result = true;
        }
        const searchDone = new CustomEvent("searchDone", { detail: this.search_result });
        window.dispatchEvent(searchDone);
        const searchResultFlag = new CustomEvent("searchResultFlag", { detail: this.no_search_result });
        window.dispatchEvent(searchResultFlag);
        //after search, search done
    }
    setSearchResult(result) {
        this.search_result = result;
        ;
    }
    getSearchResult() {
        return this.search_result;
    }
    isStringInclude(originalString, searchString) {
        if (!originalString || !searchString)
            return false;
        if (originalString.toLowerCase().includes(searchString.toLowerCase())) {
            return true;
        }
        return false;
    }
    isDateEqual(originalDate, searchDate) {
        if (!originalDate || !searchDate)
            return false;
        if (new Date(originalDate).setUTCHours(0, 0, 0, 0) === new Date(searchDate).getTime()) {
            return true;
        }
        return false;
    }
}
//# sourceMappingURL=idm-search-bar.js.map