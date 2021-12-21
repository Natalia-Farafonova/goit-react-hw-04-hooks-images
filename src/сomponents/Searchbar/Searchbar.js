import React, { useState } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleInputChange = e => {
    const { value } = e.currentTarget;
    setValue(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(value);
    reset();
  };

  const reset = () => {
    setValue('');
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
          value={value}
        />
      </form>
    </header>
  );
}

// export default class Searchbar extends Component {
//   state = {
//     value: '',
//   };

//   handleInputChange = e => {
//     const { value } = e.currentTarget;
//     this.setState({ value });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.onSubmit(this.state.value);
//     this.reset();
//   };

//   reset = () => {
//     this.setState({ value: '' });
//   };

//   render() {
//     const { value } = this.state;
//     return (
//       <header className={s.Searchbar}>
//         <form className={s.SearchForm} onSubmit={this.handleSubmit}>
//           <button type="submit" className={s.SearchFormButton}>
//             <span className={s.SearchFormButtonLabel}>Search</span>
//           </button>

//           <input
//             className={s.SearchFormInput}
//             type="text"
//             autocomplete="off"
//             autofocus
//             placeholder="Search images and photos"
//             onChange={this.handleInputChange}
//             value={value}
//           />
//         </form>
//       </header>
//     );
//   }
// }

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
