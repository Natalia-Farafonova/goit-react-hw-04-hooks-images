import './App.css';
import React, { useState, useEffect } from 'react';
// import reactDom from 'react-dom';
import pixabayApi from './сomponents/PixabayApi/PixabayApi';
import Searchbar from './сomponents/Searchbar/Searchbar';
import ImageGallery from './сomponents/ImageGallery/ImageGallery';
import Button from './сomponents/Button/Button';
import Spinner from './сomponents/Loader/Loader';
import Modal from './сomponents/Modal/Modal';

export default function App() {
  const [status, setStatus] = useState('idle');
  const [query, setQuery] = useState([]);
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  useEffect(() => {
    if (!name) {
      return;
    }

    if (page === 1) {
      setStatus('pending');
      pixabayApi(name, page)
        .then(query => query.hits)
        .then(query => setQuery(query), setStatus('resolved'));
    }

    if (page > 1) {
      setStatus('pending');
      pixabayApi(name, page)
        .then(querys => querys.hits)
        .then(querys => {
          return (
            setQuery([...query, ...querys]),
            setStatus('resolved'),
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            })
          );
        });
    }
  }, [name, page]);

  const handleSubmitForm = value => {
    setName(value);
    setPage(1);
  };

  const LoadBtn = () => {
    setPage(page + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const FindmodalImg = (id, img, tags) => {
    setModalImg({ id: id, img: img, tags: tags });
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSubmitForm} />
      {status === 'pending' && <Spinner />}
      <ImageGallery
        query={query}
        toggleModal={toggleModal}
        bigImg={FindmodalImg}
      />
      {status === 'resolved' && <Button onClick={LoadBtn} />}
      {showModal && <Modal closeModal={toggleModal} modalImg={modalImg} />}
    </div>
  );
}

// export default class App extends Component {
//   state = {
//     status: 'idle',
//     query: [],
//     page: 1,
//     name: '',
//     showModal: false,
//     modalImg: null,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.name !== this.state.name) {
//       this.setState({ status: 'pending' });

//       pixabayApi(this.state.name, this.state.page)
//         .then(query => query.hits)
//         .then(query => this.setState({ query: query, status: 'resolved' }));
//     }

//     if (prevState.page !== this.state.page && this.state.page !== 1) {
//       this.setState({ status: 'pending' });

//       pixabayApi(this.state.name, this.state.page)
//         .then(query => query.hits)
//         .then(query =>
//           this.setState(prevState => ({
//             query: [...prevState.query, ...query],
//             status: 'resolved',
//           })),
//         );
//     }
//     if (prevState.query !== this.state.query) {
//       window.scrollTo({
//         top: document.documentElement.scrollHeight,
//         behavior: 'smooth',
//       });
//     }
//   }

//   handleSubmitForm = value => {
//     this.setState({ name: value, page: 1 });
//   };
//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };

//   findmodalImg = (id, img, tags) => {
//     this.setState({ modalImg: { id: id, img: img, tags: tags } });
//   };

//   loadBtn = () => {
//     this.setState({ page: this.state.page + 1 });
//   };

//   render() {
//     const { query, status, showModal, modalImg } = this.state;
//     return (
//       <div className="App">
//         <Searchbar onSubmit={this.handleSubmitForm} />
//         {status === 'pending' && <Spinner />}
//         <ImageGallery
//           query={query}
//           toggleModal={this.toggleModal}
//           bigImg={this.findmodalImg}
//         />
//         {status === 'resolved' && <Button onClick={this.loadBtn} />}
//         {showModal && (
//           <Modal closeModal={this.toggleModal} modalImg={modalImg} />
//         )}
//       </div>
//     );
//   }
// }
