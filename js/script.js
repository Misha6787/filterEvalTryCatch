const filterByType = (type, ...values) => values.filter(value => typeof value === type),
// Фильтруем строку и выдаем дальше все элементы с типом type

	hideAllResponseBlocks = () => { // создали функцию скрытия всех блоков
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		// создали массив со всеми блоками div.dialog__response-block
		responseBlocksArray.forEach(block => block.style.display = 'none');
		// скрываем все блоки в массиве
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => { // создали функцию раскрытия всех блоков
		hideAllResponseBlocks(); // вызываем функцию скрытия всех блоков
		document.querySelector(blockSelector).style.display = 'block'; 
		// у аргумента получаемого ниже выставляем дисплай блок
		if (spanSelector) { // условие, если spanSelector есть то фунцию идет дальше
			document.querySelector(spanSelector).textContent = msgText; // задаем текст в блок spanSelector
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), 
	// функция раскрытия блока при вводе неккоректных данных

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), 
	// функция раскрытия блока при вводе коректных данных

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),
	// функция вызывается при том случае если ничего не было введено

	tryFilterByType = (type, values) => { // получаем тип и то что ввели в инпут,
		// функция фильтраций типа в тип а значений в значения для дальнейшего испольхования
		try {
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			// код вызывается сам с помощью eval и обьеденяет type и values с помощью join
			const alertMsg = (valuesArray.length) ? // если valuesArray.length есть то будет выполнятся условие...
				`Данные с типом ${type}: ${valuesArray}` : // Выходит сообщение в котором показывается тип и то что он нашел
				`Отсутствуют данные типа ${type}`; // Выходит если нет данных с тем типом что мы задали
			showResults(alertMsg); // Показывает результат в блоке по средствам функций передачи аргумента showResponseBlock
		} catch (e) { // если код выдаст ошибку она отобразиться в коде ниже без выведения ее в консоль(спасибо try/catch)
			showError(`Ошибка: ${e}`); // выводит ошибку в блоке по средствам функций передачи аргумента showResponseBlock
		}
	};

const filterButton = document.querySelector('#filter-btn'); // получаем кнопку фильтраций

filterButton.addEventListener('click', e => { // навешиваем на кнопку событие клик и анонимную фугкцтю с аргументом e
	const typeInput = document.querySelector('#type'); // получаем select
	const dataInput = document.querySelector('#data'); // получаем инпут

	if (dataInput.value === '') { // проверяем пустой ли инпут если да то выполняеться код дальше
		dataInput.setCustomValidity('Поле не должно быть пустым!'); 
		// оповещение если инпут пустой и мы пытаемся нажать на фильтровать
		showNoResults(); // показывает блок с надписью Пока что нечего показать.
	} else { // если инпут не путстой
		dataInput.setCustomValidity(''); // ничего не показывает
		e.preventDefault(); // отключает обычное поведение кнопки
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); 
		// отправляем в аргументы в функций tryFilterByType и она принимает их, дальше 
		// пройсходит фильтрация обьектов для выведения дальнейшего результата
	}
});

