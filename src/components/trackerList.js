import React, {useEffect, useState} from 'react';
import datepicker from 'js-datepicker';
import TimePicker from 'rc-time-picker';
import moment from 'moment';    
import TextInput from 'react-autocomplete-input';
import { Twitter } from 'react-social-sharing';
import 'js-datepicker/dist/datepicker.min.css'
import 'rc-time-picker/assets/index.css';
import 'react-autocomplete-input/dist/bundle.css';

export default function TrackerList(props) {
    const [list, setList] = useState(JSON.parse(localStorage.getItem("trackerList")) || []);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(undefined);
    const [medication, setMedication] = useState("");

    useEffect(() => {
        const picker = datepicker(".date-picker", {
            onSelect: (instance, date) => {setDate(date)}
        })
    }, [])

    const formSubmit = (e) => {
        e.preventDefault();

        const newObj = {
            date: JSON.stringify(date),
            time,
            medication
        }

        const newList = list.slice();
        newList.unshift(newObj);
        localStorage.setItem("trackerList", JSON.stringify(newList));
        setList(newList);
    }

    const clearForm = () => {
        window.location.reload(false);
    }

    const clearTable = () => {
        setList([]);
        localStorage.setItem("trackerList", null);
    }

    const onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
    }

    const convertTimeTo24Hours = (timeWithAmOrPm) => {
        const amOrPm = timeWithAmOrPm.split(" ")[1];
        const time = timeWithAmOrPm.split(" ")[0];
        if (amOrPm === "am") {
            return time;
        } else {
            const timeArr = time.split(":");
            const hours = timeArr[0];
            const minutes = timeArr[1];
            const seconds = timeArr[2];

            return `${Number(hours)+12}:${minutes}:${seconds}`;
        }
    }

    const formatTimeNicely = (numSeconds) => {
        let days = 0;
        let hours = 0;
        let minutes = 0;
        let seconds = 0;

        let timeLeft = numSeconds;
        
        if (timeLeft / (3600 * 24) > 0) {
            days = Math.floor(timeLeft / (3600 * 24))
            timeLeft -= days * (3600 * 24);
        }
        
        if (timeLeft / 3600 > 0) {
            hours = Math.floor(timeLeft / 3600)
            timeLeft -= hours * 3600;
        }
        
        if (timeLeft >= 60) {
            minutes = Math.floor(timeLeft / 60);
            timeLeft -= minutes * 60;
        }
        
        seconds = timeLeft;
        
        return `${days > 0 ? days + "d " : ""} ${hours > 0 ? hours + "h " : ""} ${minutes > 0 ? minutes + "m " : ""} ${seconds > 0 ? seconds + "s" : ""}`
    }

    const getTimeDifference = (medication, index) => {
        const currentDate = list[index].date.split("\"")[1].split("T")[0];
        const currentTime = convertTimeTo24Hours(list[index].time);
        const currentDateObj = new Date(`${currentDate}T${currentTime}`);

        let foundIndex = -1;
        for (let i = list.length-1; i >= 0; i--) {
            if (list[i].medication.trim() === medication.trim() && i > index) {
                foundIndex = i;
            }
        }

        if (foundIndex >= 0) {
            const foundDate = list[foundIndex].date.split("\"")[1].split("T")[0];
            const foundTime = convertTimeTo24Hours(list[foundIndex].time);
            const foundDateObj = new Date(`${foundDate}T${foundTime}`);

            const differenceInMilliseconds = currentDateObj - foundDateObj;
            const seconds = differenceInMilliseconds / 1000;
            return formatTimeNicely(seconds);
        } else {
            return 'no prior record'
        }
    }

    return (
        <div className="tracker-list">
            <form onSubmit={formSubmit}>
                <input type="text" className="date-picker" placeholder="date" value={date} onChange={(e) => console.log(e)} required />
                <TimePicker 
                    placeholder="time" 
                    onChange={(value) => value ? setTime(moment(value._d).format("hh:mm:ss a")) : setTime(undefined)} 
                    use12Hours
                    required
                />
                <p>This field auto-completes based on medication names in the table below.</p>
                <TextInput 
                    type="text" 
                    placeholder="medication"  
                    onChange={(value) => setMedication(value)} 
                    required
                    options={list.map(item => item.medication.trim()).filter(onlyUnique)}
                    trigger=""
                />
                <button type="submit">Add</button>
            </form>

            <button onClick={clearForm} className="clear-button">Clear form</button>
            <table border="1">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Medication</th>
                        <th>Time Apart</th>
                    </tr>
                </thead>
                <tbody>
                    {list && list.map((item, i) => {
                        let date;
                        if (item.date) {
                            date = item.date.split("\"")[1].split("T")[0];
                        }

                        return <tr>
                            <td>{date ? `${date.split("-")[1]}/${date.split("-")[2]}/${date.split("-")[0]}`: null}</td>
                            <td>{item.time ? item.time : null}</td>
                            <td>{item.medication ? item.medication : null}</td>
                            <td>{getTimeDifference(item.medication, i)}</td>
                        </tr>
                    })}
                </tbody>
            </table>
            <button onClick={clearTable} className="warn-button">Clear table</button>
            <p>Copyright &copy; {new Date().getFullYear()} Reighard Enterprises.</p>
            <Twitter link="https://www.popmypills.com" name="Share on Twitter" message="Check out this free medication tracker that you can save as a bookmark to your phone." label={serviceName => serviceName} />
        </div>
    )
}