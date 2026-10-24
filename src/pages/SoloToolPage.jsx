import { useState, useEffect } from "react";
import localCards from "../data/localCards";
import Card from "../components/Card";
import DeckBuilderPage from "./DeckBuilderPage";

import "../App.css";
import LoginPage from "../LoginPage";
import LeaderArea from "../components/LeaderArea";
import PlayerBoard from "../components/PlayerBoard";
import OpponentBoard from "../components/OpponentBoard";
import TacticsArea from "../components/TacticsArea";

const GAS_URL =
"https://script.google.com/macros/s/AKfycbxB_9qEhiPJwXkRynOb3X4zX_g5DfXAtfjhulZ1DlAzNxdneNBIGYv0OAxGgOtoJZnlVA/exec";

export default function SoloToolPage({
    setPage,
    bgColor,
    setBgColor,
    textColor,
  }) {
  const [activeTab, setActiveTab] = useState("player");
  const [deckCode, setDeckCode] = useState("");

  const [playerDeckData, setPlayerDeckData] = useState(null);
  const [opponentDeckData, setOpponentDeckData] = useState(null);
  const [showTacticsModal, setShowTacticsModal] = useState(false);
  const [tacticsModalOwner, setTacticsModalOwner] = useState("player");
  const [resetAllHpTrigger, setResetAllHpTrigger] = useState(0);

  // Player
  const [playerDeck, setPlayerDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [playerPlayArea, setPlayerPlayArea] = useState([]);
  const [playerTrashArea, setPlayerTrashArea] = useState([]);
  const [playerTacticsArea, setPlayerTacticsArea] = useState([]);
  const [playerTacticsDeck, setPlayerTacticsDeck] = useState([]);
  const [showPlayerTrash, setShowPlayerTrash] = useState(false);
  const [playerPP, setPlayerPP] = useState(0);
  const [playerTrashHistory, setPlayerTrashHistory] = useState([]);
  const [playerTurn, setPlayerTurn] = useState(1);

  // Opponent
  const [opponentDeck, setOpponentDeck] = useState([]);
  const [opponentHand, setOpponentHand] = useState([]);
  const [opponentPlayArea, setOpponentPlayArea] = useState([]);
  const [opponentTrashArea, setOpponentTrashArea] = useState([]);
  const [opponentTacticsArea, setOpponentTacticsArea] = useState([]);
  const [opponentTacticsDeck, setOpponentTacticsDeck] = useState([]);
  const [showOpponentTrash, setShowOpponentTrash] = useState(false);
  const [opponentPP, setOpponentPP] = useState(0);
  const [opponentTrashHistory,setOpponentTrashHistory] = useState([]);
  const [opponentTurn,setOpponentTurn] = useState(1);
  const [pendingPlayerEquipment, setPendingPlayerEquipment] = useState(null);
  const [pendingOpponentEquipment, setPendingOpponentEquipment] = useState(null);
  const [movingPlayerEquipment, setMovingPlayerEquipment] = useState(null);
  const [movingOpponentEquipment, setMovingOpponentEquipment] = useState(null);
  const [playerEquipment, setPlayerEquipment] = useState({});
  const [opponentEquipment, setOpponentEquipment] = useState({});
  const [round, setRound] = useState(1);
  const [open, setOpen] = useState(false);

  const normalizeData = (data) => {
    const leaders = data.leaders.map((l) => ({
      ...l,
      type: "leader",
    }));

    const tactics = data.tactics.map((t) => ({
      ...t,
      type: "tactics",
    }));

    const deck = data.deck.map((c) => ({
      ...c,
      type: "normal",
    }));

    return { leaders, tactics, deck };
  };

  const resolveCardsByImage = (cardsFromDeck) => {
    const allCards = JSON.parse(
      localStorage.getItem("allCards") || "[]"
    );
  
    const cardSources = [...allCards, ...localCards];
  
    const normalizeImageUrl = (url) =>
      String(url || "")
        .split("?")[0]
        .replace(/\/+$/, "");
  
    return cardsFromDeck.map((card) => {
      const targetUrl = normalizeImageUrl(card.image_url);
  
      const found = cardSources.find(
        (local) =>
          normalizeImageUrl(local.image_url) === targetUrl
      );
  
      if (found) {
        return {
          ...found,
          ...card,
          type: "tactics",
          name: card.name || found.name,
        };
      }
  
      // 一致するカードがなくても、タクティクスを残す
      return {
        ...card,
        type: "tactics",
        name: card.name || "タクティクス",
      };
    });
  };

  const normalizeSavedLeaders = (leaders) => {
    return leaders.map((leader) => {
      const localCard = localCards.find(
        (card) => String(card.id) === String(leader.id)
      );
  
      return {
        ...localCard,
        ...leader,
        hp:
          leader.hp ??
          leader.card_type?.hp ??
          localCard?.hp ??
          localCard?.card_type?.hp,
        awaken_hp:
          leader.awaken_hp ??
          leader.card_type?.awaken_hp ??
          localCard?.awaken_hp ??
          localCard?.card_type?.awaken_hp,
        type: "leader",
      };
    });
  };

  const normalizeSavedTactics = (tactics) => {
    return tactics.map((tactic) => {
      const localCard = localCards.find(
        (card) => String(card.id) === String(tactic.id)
      );
  
      return {
        ...localCard,
        ...tactic,
        tactics_type:
          tactic.tactics_type ??
          tactic.card_type?.tactics_type ??
          localCard?.tactics_type ??
          localCard?.card_type?.tactics_type,
        type: "tactics",
      };
    });
  };

  const [savedDecks, setSavedDecks] = useState(
    JSON.parse(
      localStorage.getItem("savedDecks") || "[]"
    )
  );

  const [deckHistory, setDeckHistory] = useState(
    JSON.parse(
      localStorage.getItem("deckHistory") || "[]"
    )
  );
  
  const saveDeckHistory = (code) => {
    if (!code.trim()) return;
  
    const updated = [
      code,
      ...deckHistory.filter((c) => c !== code),
    ].slice(0, 5); // 最新5件だけ
  
    setDeckHistory(updated);
  
    localStorage.setItem(
      "deckHistory",
      JSON.stringify(updated)
    );
  };

  const [selectedDeck, setSelectedDeck] = useState("");
  const loadPlayerDeck = async () => {
    saveDeckHistory(deckCode);
  
    const res = await fetch(
      `${GAS_URL}?deckCode=${deckCode}`
    );
  
    const data = normalizeData(await res.json());
  
    setPlayerDeckData(data);
    setPlayerDeck(
      [...data.deck].sort(() => Math.random() - 0.5)
    );
    setPlayerTacticsDeck(
      resolveCardsByImage(data.tactics)
    );
  
    setPlayerHand([]);
    setPlayerPlayArea([]);
    setPlayerTrashArea([]);
    setPlayerTacticsArea([]);
    setPlayerPP(0);
    setPlayerTurn(1);
    setPlayerTrashHistory([]);
  };

  const loadOpponentDeck = async () => {
    saveDeckHistory(deckCode);
  
    const res = await fetch(
      `${GAS_URL}?deckCode=${deckCode}`
    );
  
    const data = normalizeData(await res.json());
  
    setOpponentDeckData(data);
    setOpponentDeck(
      [...data.deck].sort(() => Math.random() - 0.5)
    );
    setOpponentTacticsDeck(
      resolveCardsByImage(data.tactics)
    );
  
    setOpponentHand([]);
    setOpponentPlayArea([]);
    setOpponentTrashArea([]);
    setOpponentTacticsArea([]);
    setOpponentPP(0);
    setOpponentTurn(1);
    setOpponentTrashHistory([]);
  };

  const loadSavedPlayerDeck = () => {
    const target = savedDecks.find(
      (d) => d.name === selectedDeck
    );
  
    if (!target) {
      alert("デッキを選択してください");
      return;
    }
  
    const loaded = target.deck;

    const normalizedMain = loaded.main.map((card) => ({
      ...card,
      type: "normal",
    }));

    const normalizedLeaders = normalizeSavedLeaders(loaded.leader);

    const normalizedTactics = normalizeSavedTactics(loaded.tactics);

    setPlayerDeck(
      [...normalizedMain].sort(() => Math.random() - 0.5)
    );

    setPlayerTacticsDeck([...normalizedTactics]);

    setPlayerDeckData({
      leaders: normalizedLeaders,
      tactics: normalizedTactics,
      deck: normalizedMain,
    });

    setPlayerHand([]);
    setPlayerPlayArea([]);
    setPlayerTrashArea([]);
    setPlayerTacticsArea([]);
    setPlayerPP(0);
    setPlayerTurn(1);
    setPlayerTrashHistory([]);
  };

  const loadSavedOpponentDeck = () => {
    const target = savedDecks.find(
      (d) => d.name === selectedDeck
    );
  
    if (!target) {
      alert("デッキを選択してください");
      return;
    }
  
    const loaded = target.deck;

    const normalizedMain = loaded.main.map((card) => ({
      ...card,
      type: "normal",
    }));

    const normalizedLeaders = normalizeSavedLeaders(loaded.leader);

    const normalizedTactics = normalizeSavedTactics(loaded.tactics);

    setOpponentDeck(
      [...normalizedMain].sort(() => Math.random() - 0.5)
    );

    setOpponentTacticsDeck([...normalizedTactics]);

    setOpponentDeckData({
      leaders: normalizedLeaders,
      tactics: normalizedTactics,
      deck: normalizedMain,
    });

    setOpponentHand([]);
    setOpponentPlayArea([]);
    setOpponentTrashArea([]);
    setOpponentTacticsArea([]);
    setOpponentPP(0);
    setOpponentTurn(1);
    setOpponentTrashHistory([]);
  };

  const playerDrawStartingHand = () => {
    if (playerDeck.length < 5) return;
  
    const cards = playerDeck.slice(0, 5);
  
    setPlayerHand(cards);
    setPlayerDeck(playerDeck.slice(5));
  };

  const opponentDrawStartingHand = () => {
    if (opponentDeck.length < 5) return;
  
    const cards = opponentDeck.slice(0, 5);
  
    setOpponentHand(cards);
    setOpponentDeck(opponentDeck.slice(5));
  };

  const playerDrawCard = () => {
    if (playerDeck.length === 0) return;
  
    const card = playerDeck[0];
  
    setPlayerHand((prev) => [...prev, card]);
  
    setPlayerDeck((prev) => prev.slice(1));
  };

  const opponentDrawCard = () => {
    if (opponentDeck.length === 0) return;
  
    const card = opponentDeck[0];
  
    setOpponentHand((prev) => [...prev, card]);
  
    setOpponentDeck((prev) => prev.slice(1));
  };

  const playerResetGame = () => {
    if (!playerDeckData) return;
  
    const shuffledDeck = [...playerDeckData.deck]
      .sort(() => Math.random() - 0.5);
  
    setPlayerDeck(shuffledDeck);
  
    setPlayerHand([]);
    setPlayerPlayArea([]);
    setPlayerTrashArea([]);
  
    setPlayerTacticsDeck(resolveCardsByImage(playerDeckData.tactics));
    setPlayerTacticsArea([]);

    setPlayerEquipment({}); 
    setPendingPlayerEquipment(null);
    setMovingPlayerEquipment(null);

  
    setPlayerPP(0);
  };

  const opponentResetGame = () => {
    if (!opponentDeckData) return;
  
    const shuffledDeck = [...opponentDeckData.deck]
      .sort(() => Math.random() - 0.5);
  
    setOpponentDeck(shuffledDeck);
  
    setOpponentHand([]);
    setOpponentPlayArea([]);
    setOpponentTrashArea([]);
    setOpponentTacticsDeck(resolveCardsByImage(opponentDeckData.tactics));
  
    setOpponentTacticsArea([]);
    setOpponentEquipment({}); 
    setPendingOpponentEquipment(null);
    setMovingOpponentEquipment(null);
    setOpponentPP(0);
  };

  const playerMoveSelectedToTrash = () => {
    setShowPlayerTrash(true);
  };
  
  const opponentMoveSelectedToTrash = () => {
    setShowOpponentTrash(true);
  };
  
  const playerLinkAssault = () => {
    alert("リンクアサルト");
  };

  const opponentLinkAssault = () => {
    alert("リンクアサルト");
  };
  
  const playerEndTurn = () => {
    if (playerPlayArea.length > 0) {
      setPlayerTrashHistory((prev) => {
        const lastGroup = prev[prev.length - 1];
  
        if (
          lastGroup &&
          lastGroup.turn === playerTurn &&
          lastGroup.round === round
        ) {
          return [
            ...prev.slice(0, -1),
            {
              ...lastGroup,
              cards: [...lastGroup.cards, ...playerPlayArea],
            },
          ];
        }
  
        return [
          ...prev,
          {
            turn: playerTurn,
            round,
            label: `${playerTurn}ターン目（${round}ラウンド目）`,
            cards: [...playerPlayArea],
          },
        ];
      });
    }
  
    setPlayerPlayArea([]);
    setPlayerTurn((prev) => prev + 1);
  };
  
  const opponentEndTurn = () => {
    if (opponentPlayArea.length > 0) {
      setOpponentTrashHistory((prev) => {
        const lastGroup = prev[prev.length - 1];
  
        if (
          lastGroup &&
          lastGroup.turn === opponentTurn &&
          lastGroup.round === round
        ) {
          return [
            ...prev.slice(0, -1),
            {
              ...lastGroup,
              cards: [...lastGroup.cards, ...opponentPlayArea],
            },
          ];
        }
  
        return [
          ...prev,
          {
            turn: opponentTurn,
            round,
            label: `${opponentTurn}ターン目（${round}ラウンド目）`,
            cards: [...opponentPlayArea],
          },
        ];
      });
    }
  
    setOpponentPlayArea([]);
    setOpponentTurn((prev) => prev + 1);
  };

  const playerPlayCard = (index) => {
    const card = playerHand[index];
  
    setPlayerPlayArea((prev) => [...prev, card]);
  
    setPlayerHand((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const opponentPlayCard = (index) => {
    const card = opponentHand[index];
  
    setOpponentPlayArea((prev) => [...prev, card]);
  
    setOpponentHand((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const playerReturnToHand = (index) => {
    const card = playerPlayArea[index];
  
    setPlayerHand((prev) => [...prev, card]);
  
    setPlayerPlayArea((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const opponentReturnToHand = (index) => {
    const card = opponentPlayArea[index];
  
    setOpponentHand((prev) => [...prev, card]);
  
    setOpponentPlayArea((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // トラッシュ履歴にカードを追加する共通処理
  // 同じターンの履歴があればそこへ追加し、なければ新規作成
  const addToTrashHistory = (setTrashHistory, card, turn) => {
    if (!card) return;

    setTrashHistory((prev) => {
      const lastGroup = prev[prev.length - 1];

      // 最後の履歴が同じターンなら、そのグループに追加
      if (lastGroup && lastGroup.turn === turn && lastGroup.round === round) {
        return [
          ...prev.slice(0, -1),
          {
            ...lastGroup,
            cards: [...lastGroup.cards, card],
          },
        ];
      }

      // 同じターンの履歴がなければ新しく作成
      return [
        ...prev,
        {
          turn,
          round,
          label: `${turn}ターン目（${round}ラウンド目）`,
          cards: [card],
        },
      ];
    });
  };

  // トラッシュ履歴から指定位置のカードを取り除く共通処理
  const removeFromTrashHistory = (history, setTrashHistory, groupIndex, cardIndex) => {
    setTrashHistory((prev) =>
      prev
        .map((group, i) => {
          if (i !== groupIndex) return group;

          return {
            ...group,
            cards: group.cards.filter((_, j) => j !== cardIndex),
          };
        })
        .filter((group) => group.cards.length > 0)
    );
  };

  // 自分：手札からトラッシュへ
  const playerHandLongPressToTrash = (index) => {
    const card = playerHand[index];
    if (!card) return;

    setPlayerHand((prev) => prev.filter((_, i) => i !== index));
    addToTrashHistory(setPlayerTrashHistory, card, playerTurn);
  };

  // 相手：手札からトラッシュへ
  const opponentHandLongPressToTrash = (index) => {
    const card = opponentHand[index];
    if (!card) return;

    setOpponentHand((prev) => prev.filter((_, i) => i !== index));
    addToTrashHistory(setOpponentTrashHistory, card, opponentTurn);
  };

  // 自分：場からトラッシュへ
  const playerMoveToTrash = (index) => {
    const card = playerPlayArea[index];
    if (!card) return;

    setPlayerPlayArea((prev) => prev.filter((_, i) => i !== index));
    addToTrashHistory(setPlayerTrashHistory, card, playerTurn);
  };

  // 相手：場からトラッシュへ
  const opponentMoveToTrash = (index) => {
    const card = opponentPlayArea[index];
    if (!card) return;

    setOpponentPlayArea((prev) => prev.filter((_, i) => i !== index));
    addToTrashHistory(setOpponentTrashHistory, card, opponentTurn);
  };

  // 自分：トラッシュ履歴から手札へ
  const playerTrashLongPressToHand = (groupIndex, cardIndex) => {
    const group = playerTrashHistory[groupIndex];
    const card = group?.cards?.[cardIndex];
    if (!card) return;

    setPlayerHand((prev) => [...prev, card]);
    removeFromTrashHistory(
      playerTrashHistory,
      setPlayerTrashHistory,
      groupIndex,
      cardIndex
    );
  };

  // 相手：トラッシュ履歴から手札へ
  const opponentTrashLongPressToHand = (groupIndex, cardIndex) => {
    const group = opponentTrashHistory[groupIndex];
    const card = group?.cards?.[cardIndex];
    if (!card) return;

    setOpponentHand((prev) => [...prev, card]);
    removeFromTrashHistory(
      opponentTrashHistory,
      setOpponentTrashHistory,
      groupIndex,
      cardIndex
    );
  };

  const playerMoveTacticToArea = (card) => {
    setPlayerTacticsDeck(prev =>
      prev.filter(c => c !== card)
    );
  
    setPlayerTacticsArea(prev => [...prev, card]);
  };

  const opponentMoveTacticToArea = (card) => {
    setOpponentTacticsDeck(prev =>
      prev.filter(c => c !== card)
    );
  
    setOpponentTacticsArea(prev => [...prev, card]);
  };

  const playerMoveTacticToPlayArea = (card) => {
    if (!card) return;
  
    // 装備タクティクス
    if (card.tactics_type === "equipment") {
      setPendingPlayerEquipment({ card });
  
      setShowTacticsModal(false);
  
      return;
    }
  
    // 通常タクティクス
    setPlayerPlayArea((prev) => [...prev, card]);
  
    setPlayerTacticsArea((prev) =>
      prev.filter((c) => c.id !== card.id)
    );

    setShowTacticsModal(false);
  };

  const opponentMoveTacticToPlayArea = (card) => {
    if (!card) return;
  
    // 装備タクティクス
    if (card.tactics_type === "equipment") {
      setPendingOpponentEquipment({ card });
  
      setShowTacticsModal(false);
  
      return;
    }
  
    // 通常タクティクス
    setOpponentPlayArea((prev) => [...prev, card]);
  
    setOpponentTacticsArea((prev) =>
      prev.filter((c) => c.id !== card.id)
    );
  
    setShowTacticsModal(false); // もし共有モーダルなら
  };

  const handlePlayerLeaderClick = (leaderKey) => {

    // ① 装備
    if (pendingPlayerEquipment) {

      setPlayerEquipment((prev) => {
        const current = prev[leaderKey] || [];

        // 1人のリーダーにつき装備は5枚まで
        if (current.length >= 5) {
          return prev;
        }

        const next = {
          ...prev,
          [leaderKey]: [...current, pendingPlayerEquipment.card],
        };
        
        return next;
      });

      setPlayerTacticsArea((prev) =>
        prev.filter((c) => c !== pendingPlayerEquipment.card)
      );

      setPendingPlayerEquipment(null);
      return;
    }

    // ② 装備の移動
    if (movingPlayerEquipment) {
      const { card, from } = movingPlayerEquipment;

      // 同じリーダーを選んだ場合は移動しない
      if (from === leaderKey) {
        setMovingPlayerEquipment(null);
        return;
      }

      setPlayerEquipment((prev) => {
        const fromList = prev[from] || [];
        const toList = prev[leaderKey] || [];

        // 移動先の装備が5枚なら移動しない
        if (toList.length >= 5) {
          return prev;
        }

        return {
          ...prev,
          [from]: fromList.filter((c) => c !== card),
          [leaderKey]: [...toList, card],
        };
      });

      setMovingPlayerEquipment(null);
    }
  };

  const handleOpponentLeaderClick = (leaderKey) => {
    // 装備を付ける
    if (pendingOpponentEquipment) {
      const card = pendingOpponentEquipment.card;
      const currentEquipment = opponentEquipment[leaderKey] || [];
  
      // 5枚以上なら、装備カードを消費せず選択状態を維持
      if (currentEquipment.length >= 5) {
        alert("このリーダーには5枚までしか装備できません");
        return;
      }
  
      setOpponentEquipment((prev) => ({
        ...prev,
        [leaderKey]: [...(prev[leaderKey] || []), card],
      }));
  
      setOpponentTacticsArea((prev) =>
        prev.filter((c) => c !== card)
      );
  
      setPendingOpponentEquipment(null);
      return;
    }
  
    // 装備を別のリーダーへ移動する
    if (movingOpponentEquipment) {
      const { card, from } = movingOpponentEquipment;
  
      if (from === leaderKey) {
        setMovingOpponentEquipment(null);
        return;
      }
  
      const destinationEquipment = opponentEquipment[leaderKey] || [];
  
      // 移動先が5枚なら、移動元からも取り除かない
      if (destinationEquipment.length >= 5) {
        alert("移動先のリーダーには5枚までしか装備できません");
        return;
      }
  
      setOpponentEquipment((prev) => ({
        ...prev,
        [from]: (prev[from] || []).filter((c) => c !== card),
        [leaderKey]: [...(prev[leaderKey] || []), card],
      }));
  
      setMovingOpponentEquipment(null);
    }
  };


  const endRound = () => {
    // プレイヤー：プレイエリアと手札を同じターンの履歴にまとめる
    const playerCardsToTrash = [
      ...playerPlayArea,
      ...playerHand,
    ];
  
    if (playerCardsToTrash.length > 0) {
      setPlayerTrashHistory((prev) => {
        const lastGroup = prev[prev.length - 1];
  
        if (
          lastGroup &&
          lastGroup.turn === playerTurn &&
          lastGroup.round === round
        ) {
          return [
            ...prev.slice(0, -1),
            {
              ...lastGroup,
              cards: [...lastGroup.cards, ...playerCardsToTrash],
            },
          ];
        }
  
        return [
          ...prev,
          {
            turn: playerTurn,
            round,
            label: `${playerTurn}ターン目（${round}ラウンド目）`,
            cards: playerCardsToTrash,
          },
        ];
      });
    }
  
    // プレイヤーのプレイエリアと手札を空にする
    setPlayerPlayArea([]);
    setPlayerHand([]);
  
    // 相手：プレイエリアと手札を同じターンの履歴にまとめる
    const opponentCardsToTrash = [
      ...opponentPlayArea,
      ...opponentHand,
    ];
  
    if (opponentCardsToTrash.length > 0) {
      setOpponentTrashHistory((prev) => {
        const lastGroup = prev[prev.length - 1];
  
        if (
          lastGroup &&
          lastGroup.turn === opponentTurn &&
          lastGroup.round === round
        ) {
          return [
            ...prev.slice(0, -1),
            {
              ...lastGroup,
              cards: [...lastGroup.cards, ...opponentCardsToTrash],
            },
          ];
        }
  
        return [
          ...prev,
          {
            turn: opponentTurn,
            round,
            label: `${opponentTurn}ターン目（${round}ラウンド目）`,
            cards: opponentCardsToTrash,
          },
        ];
      });
    }
  
    // 相手のプレイエリアと手札を空にする
    setOpponentPlayArea([]);
    setOpponentHand([]);
  
    // ターン番号をリセット
    setPlayerTurn(1);
    setOpponentTurn(1);
  
    // ラウンドを進める
    setRound((prev) => prev + 1);
  
    // すべてのリーダーのHPをリセットするトリガー
    setResetAllHpTrigger((prev) => prev + 1);
  };


  return (
    
    <div 
      className="app-container"
      style={{
        minHeight: "100vh",
        padding: "16px",
        boxSizing: "border-box",
    }}>
      <h1 style={{ color: textColor }}>クロススターズ 一人回しツール</h1>
      <p>
        背景色変更：
        <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
        />
      </p>
      <div className="menu-buttons">

        <button onClick={()=>setPage("builder")}>
          デッキメーカーへ
        </button>
      </div>
      

      <div className="deck-load-area">
        <div className="deck-input-wrapper">
        <input
          value={deckCode}
          onChange={(e) => setDeckCode(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="デッキコード"
        />

        {open && deckHistory.length > 0 && (
          <div className="deck-dropdown">
            {deckHistory.map((code) => (
              <div
                key={code}
                className="deck-dropdown-item"
                onClick={() => {
                  setDeckCode(code);
                  setOpen(false);
                }}
              >
                {code}
              </div>
            ))}
          </div>
        )}
      </div>

      <datalist id="deck-history">
        {deckHistory.map((code) => (
          <option key={code} value={code} />
        ))}
      </datalist>

        <button onClick={loadPlayerDeck}>
          自分読込
        </button>

        <button onClick={loadOpponentDeck}>
          相手読込
        </button>
      </div>

      <div className="deck-load-area">
        <select
          value={selectedDeck}
          onChange={(e) =>
            setSelectedDeck(e.target.value)
          }
        >
          <option value="">
            保存済みデッキ
          </option>

          {savedDecks.map((d) => (
            <option
              key={d.name}
              value={d.name}
            >
              {d.name}
            </option>
          ))}
        </select>

        <button onClick={loadSavedPlayerDeck}>
          自分読込
        </button>

        <button onClick={loadSavedOpponentDeck}>
          相手読込
        </button>
      </div>
      

      {(playerDeckData || opponentDeckData) && (
        <>
          <div className="leader-layout">
            <div className="leader-content">
              <LeaderArea
                leaders={playerDeckData?.leaders || []}
                opponentLeaders={
                  opponentDeckData?.leaders || []
                }

                playerEquipment={playerEquipment}
                setPlayerEquipment={setPlayerEquipment}
                pendingPlayerEquipment={pendingPlayerEquipment}
                setPendingPlayerEquipment={setPendingPlayerEquipment}
                movingPlayerEquipment={movingPlayerEquipment}
                setMovingPlayerEquipment={setMovingPlayerEquipment}
                onLeaderClick={handlePlayerLeaderClick}

                opponentEquipment={opponentEquipment}
                setOpponentEquipment={setOpponentEquipment}
                pendingOpponentEquipment={pendingOpponentEquipment}
                setPendingOpponentEquipment={setPendingOpponentEquipment}
                movingOpponentEquipment={movingOpponentEquipment}
                setMovingOpponentEquipment={setMovingOpponentEquipment}
                onOpponentLeaderClick={handleOpponentLeaderClick}

                resetAllHpTrigger={resetAllHpTrigger}
              />
            </div>
              <div className="tab-buttons">
                <button
                  className={activeTab === "player" ? "active" : ""}
                  aria-pressed={activeTab === "player"}
                  onClick={() => setActiveTab("player")}
                  style={{
                    backgroundColor:
                      activeTab === "player" ? bgColor : "transparent",
                    color: textColor,
                    borderColor: textColor,
                    borderWidth: activeTab === "player" ? 3 : 1,
                    fontWeight: activeTab === "player" ? "bold" : "normal",
                    boxShadow:
                      activeTab === "player"
                        ? `inset 0 0 0 2px ${textColor}`
                        : "none",
                  }}
                >
                  {activeTab === "player" ? "● 自分盤面（操作中）" : "自分盤面"}
                </button>

                <button
                  className={activeTab === "opponent" ? "active" : ""}
                  aria-pressed={activeTab === "opponent"}
                  onClick={() => setActiveTab("opponent")}
                  style={{
                    backgroundColor:
                      activeTab === "opponent" ? bgColor : "transparent",
                    color: textColor,
                    borderColor: textColor,
                    borderWidth: activeTab === "opponent" ? 3 : 1,
                    fontWeight: activeTab === "opponent" ? "bold" : "normal",
                    boxShadow:
                      activeTab === "opponent"
                        ? `inset 0 0 0 2px ${textColor}`
                        : "none",
                  }}
                >
                  {activeTab === "opponent" ? "● 相手盤面（操作中）" : "相手盤面"}
                </button>
              </div>
          </div>

          {activeTab === "player" && (
            <PlayerBoard
              deck={playerDeck}
              hand={playerHand}
              playArea={playerPlayArea}
              trashArea={playerTrashArea}
              tacticsArea={playerTacticsArea}
              tacticsDeck={playerTacticsDeck}
              pendingPlayerEquipment={pendingPlayerEquipment}
              setPendingPlayerEquipment={setPendingPlayerEquipment}
              pp={playerPP}
              setDeck={setPlayerDeck}
              setPlayArea={setPlayerPlayArea}
              setTrashArea={setPlayerTrashArea}
              onOpenTactics={() => {
                setTacticsModalOwner("player");
                setShowTacticsModal(true);
              }}
              setHand={setPlayerHand}
              onHandLongPressToTrash={playerHandLongPressToTrash}
              onPlayLongPressToTrash={playerMoveToTrash}
              onTrashLongPressToHand={playerTrashLongPressToHand}
              onLinkAssaultTrash={(cards) => {
                setPlayerTrashHistory((prev) => {
                  const lastGroup = prev[prev.length - 1];
              
                  if (
                    lastGroup &&
                    lastGroup.turn === playerTurn &&
                    lastGroup.round === round
                  ) {
                    return [
                      ...prev.slice(0, -1),
                      {
                        ...lastGroup,
                        cards: [...lastGroup.cards, ...cards],
                      },
                    ];
                  }
              
                  return [
                    ...prev,
                    {
                      turn: playerTurn,
                      round,
                      label: `${playerTurn}ターン目（${round}ラウンド目）`,
                      cards,
                    },
                  ];
                });
              }}

              drawStartingHand={playerDrawStartingHand}
              drawCard={playerDrawCard}
              resetGame={playerResetGame}
              playCard={playerPlayCard}
              returnToHand={playerReturnToHand}
              moveTacticToArea={playerMoveTacticToArea}
              moveTacticToPlayArea={playerMoveTacticToPlayArea}
              moveSelectedToTrash={playerMoveSelectedToTrash}
              linkAssault={playerLinkAssault}
              endTurn={playerEndTurn}
              endRound={endRound}
            />
          )}

          {activeTab === "opponent" && (
            <OpponentBoard
              deck={opponentDeck}
              hand={opponentHand}
              playArea={opponentPlayArea}
              trashArea={opponentTrashArea}
              tacticsArea={opponentTacticsArea}
              tacticsDeck={opponentTacticsDeck}
              pendingOpponentEquipment={pendingOpponentEquipment}
              setPendingOpponentEquipment={setPendingOpponentEquipment}
              pp={opponentPP}
              setDeck={setOpponentDeck}
              setPlayArea={setOpponentPlayArea}
              setTrashArea={setOpponentTrashArea}
              onOpenTactics={() => {
                setTacticsModalOwner("opponent");
                setShowTacticsModal(true);
              }}
              setHand={setOpponentHand}
              onHandLongPressToTrash={opponentHandLongPressToTrash}
              onPlayLongPressToTrash={opponentMoveToTrash}
              onTrashLongPressToHand={opponentTrashLongPressToHand}
              onLinkAssaultTrash={(cards) => {
                setOpponentTrashHistory((prev) => {
                  const lastGroup = prev[prev.length - 1];
              
                  if (
                    lastGroup &&
                    lastGroup.turn === opponentTurn &&
                    lastGroup.round === round
                  ) {
                    return [
                      ...prev.slice(0, -1),
                      {
                        ...lastGroup,
                        cards: [...lastGroup.cards, ...cards],
                      },
                    ];
                  }
              
                  return [
                    ...prev,
                    {
                      turn: opponentTurn,
                      round,
                      label: `${opponentTurn}ターン目（${round}ラウンド目）`,
                      cards,
                    },
                  ];
                });
              }}

              drawStartingHand={opponentDrawStartingHand}
              drawCard={opponentDrawCard}
              resetGame={opponentResetGame}
              playCard={opponentPlayCard}
              returnToHand={opponentReturnToHand}
              moveTacticToArea={opponentMoveTacticToArea}
              moveTacticToPlayArea={opponentMoveTacticToPlayArea}
              moveSelectedToTrash={opponentMoveSelectedToTrash}
              linkAssault={opponentLinkAssault}
              endTurn={opponentEndTurn}
              endRound={endRound}
            />
          )}
        </>
      )}

      {showPlayerTrash && (
        <div
          className="modal-overlay"
          onClick={() => setShowPlayerTrash(false)}
        >
          <div
            className="modal-content"
            style={{ color: textColor }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ color: textColor }}>トラッシュ履歴</h2>

            {playerTrashHistory.length === 0 ? (
              <p>まだカードはありません</p>
            ) : (
              playerTrashHistory.map((group, index) => (
                <div
                  key={index}
                  className="trash-turn-group"
                >
                  <h3>
                    {group.label ?? ` ${group.turn}ターン目`}
                  </h3>

                  <div className="card-row">
                    {group.cards.map((card, i) => (
                      <Card
                        key={i}
                        src={card.image_url}
                        name={card.name}
                        type={card.type}
                        onLongPress={() =>
                          playerTrashLongPressToHand(index, i)
                        }
                      />
                    ))}
                  </div>
                </div>
              ))
            )}

            <button
              onClick={() => setShowPlayerTrash(false)}
            >
              閉じる
            </button>
          </div>
        </div>
      )}

      {showOpponentTrash && (
        <div
          className="modal-overlay"
          onClick={() => setShowOpponentTrash(false)}
        >
          <div
            className="modal-content"
            style={{ color: textColor }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>トラッシュ履歴</h2>

            {opponentTrashHistory.length === 0 ? (
              <p>まだカードはありません</p>
            ) : (
              opponentTrashHistory.map((group, index) => (
                <div
                  key={index}
                  className="trash-turn-group"
                >
                  <h3>
                    ターン {group.turn}
                  </h3>

                  <div className="card-row">
                    {group.cards.map((card, i) => (
                      <Card
                        key={i}
                        src={card.image_url}
                        name={card.name}
                        type={card.type}
                        onLongPress={() =>
                          opponentTrashLongPressToHand(index, i)
                        }
                      />
                    ))}
                  </div>
                </div>
              ))
            )}

            <button
              onClick={() => setShowOpponentTrash(false)}
            >
              閉じる
            </button>
          </div>
        </div>
      )}
      
      {showTacticsModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowTacticsModal(false)}
        >
          <div
            className="modal-content"
            style={{ color: textColor }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>タクティクス</h2>

            <TacticsArea
              title="タクティクスエリア"
              tactics={
                tacticsModalOwner === "player"
                  ? playerTacticsArea
                  : opponentTacticsArea
              }
              onClickTactic={
                tacticsModalOwner === "player"
                  ? playerMoveTacticToPlayArea
                  : opponentMoveTacticToPlayArea
              }
            />

            <TacticsArea
              title="タクティクスデッキ"
              tactics={
                tacticsModalOwner === "player"
                  ? playerTacticsDeck
                  : opponentTacticsDeck
              }
              onClickTactic={
                tacticsModalOwner === "player"
                  ? playerMoveTacticToArea
                  : opponentMoveTacticToArea
              }
            />

            <button onClick={() => setShowTacticsModal(false)}>
              閉じる
            </button>
          </div>
        </div>
      )}

      {pendingPlayerEquipment && (
        <div className="state-banner">
          装備するリーダーを選択してください
        </div>
      )}

      {movingPlayerEquipment && (
        <div className="state-banner">
          移動先のリーダーを選択してください
        </div>
      )}
    </div>
  );
}
;