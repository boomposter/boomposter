
export default function Filtres() {
  return (
    <div className="filters-body">
        <div className="filter-block"><div className="filters-title">Местоположение</div>
        <div className="filter-inputs">
           <form className="nosubmit">
          <input className="nosubmit sm:w-[306px] lg:w-[455px]" type="search" placeholder="Казахстан, г. Актобе" />
           </form>
        </div>
        </div>
        <div className="filter-block"><div className="filters-title">Изображение</div>
        <label className="main">Статичное<input type="checkbox" /><span className="geekmark"></span></label>
        <label className="main">Динамическое<input type="checkbox" /><span className="geekmark"></span></label>
        <label className="main">Монитор<input type="checkbox" /><span className="geekmark"></span></label>
        </div>
        <div className="filter-block"><div className="filters-title">Освещение в ночное время суток</div>
        <label className="main">Да<input type="checkbox" /><span className="geekmark"></span></label>
        <label className="main">Нет<input type="checkbox" /><span className="geekmark"></span></label>
        </div>
        <div className="filter-block"><div className="filters-title">Конструкция</div>
        <label className="main">Немобильная<input type="checkbox" /><span className="geekmark"></span></label>
        <label className="main">Мобильная<input type="checkbox" /><span className="geekmark"></span></label>
        <label className="main">Временная<input type="checkbox" /><span className="geekmark"></span></label>
        <label className="main">Постоянная<input type="checkbox" /><span className="geekmark"></span></label>
        </div>
        <div className="filter-block"><div className="filters-title">Размер</div>
        <div className="filter-inputs">Ширина <input placeholder="2" /> м <img src="./img/x.svg" alt="" /> Высота <input placeholder="2" /> м</div>
        <label className="main">И больше<input type="checkbox" /><span className="geekmark"></span></label>
        <label className="main">И меньше<input type="checkbox" /><span className="geekmark"></span></label>
        </div>
        <div className="filter-block"><div className="filters-title">Стоимость</div>
        <div className="filter-inputs">От<input placeholder="0" /> до <input placeholder="0" /> ₸ в месяц</div>
        </div>
        <button className="save-button">Сохранить</button>
        </div>
  )
}
