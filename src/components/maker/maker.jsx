import React, { useEffect, useState } from 'react';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './maker.module.css'
import { useNavigate } from 'react-router'
import Editor from '../editor/editor';
import Preview from '../preview/preview';

const Maker = ({ authService, FileInput, cardRepository }) => {
    const historyState = useNavigate();
    const [cards, setCards] = useState({});
    const [userId, setUserId] = useState(historyState && historyState.id);

    console.log(historyState);
    const history = useNavigate();
    const onLogout = () => {
        authService.logout();
    }
    useEffect(() => {
        authService.onAuthChange(user => {
            if (user) {
                setUserId(user.uid)
            } else {
                history('/')

            }
        })
    })

    const createOrupdateCard = (card) => {
        // 콜백으로도 사용가능
        setCards(cards => {
            const updated = { ...cards };
            updated[card.id] = card;
            return updated;
        });
        cardRepository.saveCard(userId, card);
    }
    const deleteCard = (card) => {
        setCards(cards => {
            const updated = { ...cards };
            delete updated[card.id];
            return updated;
        });
    }
    return (
        <section className={styles.maker}>
            <Header onLogout={onLogout} />
            <div className={styles.container}>
                <Editor FileInput={FileInput} updateCard={createOrupdateCard} deleteCard={deleteCard} addCard={createOrupdateCard} cards={cards} />
                <Preview cards={cards} />
            </div>
            <Footer />
        </section>
    )
};

export default Maker;