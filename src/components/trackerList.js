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
                    options={list.map(item => item.medication)}
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
                    </tr>
                </thead>
                <tbody>
                    {list && list.map((item) => {
                        let date;
                        if (item.date) {
                            date = item.date.split("\"")[1].split("T")[0];
                        }

                        return <tr>
                            <td>{date ? `${date.split("-")[1]}/${date.split("-")[2]}/${date.split("-")[0]}`: null}</td>
                            <td>{item.time ? item.time : null}</td>
                            <td>{item.medication ? item.medication : null}</td>
                        </tr>
                    })}
                </tbody>
            </table>
            <button onClick={clearTable} className="warn-button">Clear table</button>
            <p>Copyright &copy; {new Date().getFullYear()} Reighard Enterprises. Please share.</p>
            <Twitter link="https://www.popmypills.com" name="Share on Twitter" message="Check out this free medication tracker that you can save as a bookmark to your phone." label={serviceName => serviceName} />
        </div>
    )
}