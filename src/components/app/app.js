import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component { //Сотрудники по умолчанию
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'Зотов Олег', salary: 800, increase: false, rise: true, id: 1},
                {name: 'Воронина Нина', salary: 3000, increase: true, rise: false, id: 2},
                {name: 'Орлов Николай', salary: 5000, increase: false, rise: false, id: 3},
                {name: 'Никифоров Андрей', salary: 5000, increase: false, rise: false, id: 4},
                {name: 'Себастьянов Никола', salary: 5000, increase: false, rise: false, id: 5},
                {name: 'Павлов Павел', salary: 5000, increase: false, rise: false, id: 6},
                {name: 'Карлов Андрей', salary: 5000, increase: false, rise: false, id: 7},
                {name: 'Павлова Наталья', salary: 5000, increase: false, rise: false, id: 8},
                {name: 'Ининова Виктория', salary: 5000, increase: false, rise: false, id: 9},
                {name: 'Пурга Виктор', salary: 5000, increase: false, rise: false, id: 10},
                {name: 'Белый Алексей', salary: 5000, increase: false, rise: false, id: 11},
                {name: 'Ростик Руслан', salary: 5000, increase: false, rise: false, id: 12},
            ],
            term: '', 
            filter: 'all'
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    // Добавление пользователей
    addItem = (name, salary) => {
        const newItem = {
            name, 
            salary,
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        });
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }
    // Поиск сотрудников
    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }
    // Фильтрация сотрудников
    filterPost = (items, filter) => {
        switch (filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render() { // Отображение энтерфейса на основе данных из состояния компонента и обработчиков событий.
        const {data, term, filter} = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);

        return (
            <div className="app">
                <AppInfo employees={employees} increased={increased}/>
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
                
                <EmployeesList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;