const localCards = [
    /********************************
     * エース
     ********************************/
    {
      id: "n1",
      name: "慈悲の刃",
      image_url: `${import.meta.env.BASE_URL}cards/ace_red_a.png`,
  
      card_type: {
        internal_id: "attack",
        display_name: "アタック",
      },
  
      is_ace: true,
      is_local: true,
      is_new: true,
    },
    {
        id: "n2",
        name: "エリートコマンダー",
        image_url: `${import.meta.env.BASE_URL}cards/ace_red_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },
    
        is_ace: true,
        is_local: true,
        is_new: true,
      },
      {
        id: "n3",
        name: "オーバードライブ",
        image_url: `${import.meta.env.BASE_URL}cards/ace_blue_a.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        is_ace: true,
        is_local: true,
        is_new: true,
      },
      {
        id: "n4",
        name: "ダイナミックデュオ",
        image_url: `${import.meta.env.BASE_URL}cards/ace_blue_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },
    
        is_ace: true,
        is_local: true,
        is_new: true,
      },
      {
        id: "n5",
        name: "テラーエンゲージ",
        image_url: `${import.meta.env.BASE_URL}cards/ace_yellow_a.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        is_ace: true,
        is_local: true,
        is_new: true,
      },
      {
        id: "n6",
        name: "グレイトフルファーマー",
        image_url: `${import.meta.env.BASE_URL}cards/ace_yellow_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },
    
        is_ace: true,
        is_local: true,
        is_new: true,
      },
      {
        id: "n7",
        name: "アナイアレーション",
        image_url: `${import.meta.env.BASE_URL}cards/ace_green_a.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        is_ace: true,
        is_local: true,
        is_new: true,
      },
      {
        id: "n8",
        name: "収穫の刻",
        image_url: `${import.meta.env.BASE_URL}cards/ace_green_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },
    
        is_ace: true,
        is_local: true,
        is_new: true,
      },








     /********************************
      * リーダー
     ********************************/
      {
        id: "n9",
        name: "Selly (IGV)",
        image_url: `${import.meta.env.BASE_URL}cards/selly_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}cards/selly_a.png`,
        family_id:"n9",
    
        card_type: {
          internal_id: "leader",
          display_name: "リーダー",
        },
    
        hp:100,
        awaken_hp:130,
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n10",
        name: "LEO",
        image_url: `${import.meta.env.BASE_URL}cards/leo_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}cards/leo_a.png`,
        family_id:"n10",
    
        card_type: {
          internal_id: "leader",
          display_name: "リーダー",
        },
    
        hp:100,
        awaken_hp:130,
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n11",
        name: "秋雪こはく",
        image_url: `${import.meta.env.BASE_URL}cards/kohaku_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}cards/kohaku_a.png`,
        family_id:"n11",
    
        card_type: {
          internal_id: "leader",
          display_name: "リーダー",
        },
    
        hp:110,
        awaken_hp:140,
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n12",
        name: "dtto.",
        image_url: `${import.meta.env.BASE_URL}cards/dtto_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}cards/dtto_a.png`,
        family_id:"n12",
    
        card_type: {
          internal_id: "leader",
          display_name: "リーダー",
        },
    
        hp:110,
        awaken_hp:140,
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n13",
        name: "渋谷ハル(IGV)",
        image_url: `${import.meta.env.BASE_URL}cards/haru_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}cards/haru_a.png`,
        family_id:"n13",
    
        card_type: {
          internal_id: "leader",
          display_name: "リーダー",
        },
    
        hp:110,
        awaken_hp:140,
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n14",
        name: "碧依さくら",
        image_url: `${import.meta.env.BASE_URL}cards/sakura_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}cards/sakura_a.png`,
        family_id:"n14",
    
        card_type: {
          internal_id: "leader",
          display_name: "リーダー",
        },
    
        hp:100,
        awaken_hp:130,
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n15",
        name: "Kamito (IGV)",
        image_url: `${import.meta.env.BASE_URL}cards/kamito_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}cards/kamito_a.png`,
        family_id:"n15",
    
        card_type: {
          internal_id: "leader",
          display_name: "リーダー",
        },
    
        hp:110,
        awaken_hp:140,
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n16",
        name: "tttcheekyttt",
        image_url: `${import.meta.env.BASE_URL}cards/tttcheekyttt_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}cards/tttcheekyttt_a.png`,
        family_id:"n16",
    
        card_type: {
          internal_id: "leader",
          display_name: "リーダー",
        },
    
        hp:100,
        awaken_hp:130,
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n17",
        name: "神成きゅび(IGV)",
        image_url: `${import.meta.env.BASE_URL}cards/q_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}cards/q_a.png`,
        family_id:"n17",
    
        card_type: {
          internal_id: "leader",
          display_name: "リーダー",
        },
    
        hp:110,
        awaken_hp:140,
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n18",
        name: "Ras (IGV)",
        image_url: `${import.meta.env.BASE_URL}cards/ras_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}cards/ras_a.png`,
        family_id:"n18",
    
        card_type: {
          internal_id: "leader",
          display_name: "リーダー",
        },
    
        hp:110,
        awaken_hp:140,
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n19",
        name: "胡桃のあ(IGV)",
        image_url: `${import.meta.env.BASE_URL}cards/noa_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}cards/noa_a.png`,
        family_id:"n19",
    
        card_type: {
          internal_id: "leader",
          display_name: "リーダー",
        },
    
        hp:100,
        awaken_hp:130,
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n20",
        name: "Cpt(IGV)",
        image_url: `${import.meta.env.BASE_URL}cards/cpt_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}cards/cpt_a.png`,
        family_id:"n20",
    
        card_type: {
          internal_id: "leader",
          display_name: "リーダー",
        },
    
        hp:110,
        awaken_hp:140,
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n21",
        name: "Zeder",
        image_url: `${import.meta.env.BASE_URL}cards/zeder_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}cards/zeder_a.png`,
        family_id:"n21",
    
        card_type: {
          internal_id: "leader",
          display_name: "リーダー",
        },
    
        hp:100,
        awaken_hp:130,
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n22",
        name: "Arya Kuroha",
        image_url: `${import.meta.env.BASE_URL}cards/kuroha_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}cards/kuroha_a.png`,
        family_id:"n22",
    
        card_type: {
          internal_id: "leader",
          display_name: "リーダー",
        },
    
        hp:110,
        awaken_hp:140,
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n23",
        name: "ハセシン",
        image_url: `${import.meta.env.BASE_URL}cards/hase_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}cards/hase_a.png`,
        family_id:"n23",
    
        card_type: {
          internal_id: "leader",
          display_name: "リーダー",
        },
    
        hp:110,
        awaken_hp:140,
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n24",
        name: "花芽すみれ(IGV)",
        image_url: `${import.meta.env.BASE_URL}cards/sumire_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}cards/sumire_a.png`,
        family_id:"n24",
    
        card_type: {
          internal_id: "leader",
          display_name: "リーダー",
        },
    
        hp:110,
        awaken_hp:140,
        is_ace: false,
        is_local: true,
        is_new: true,
      },







      /********************************
        * リーダー専用カード
      ********************************/
      {
        id: "n25",
        name: "あああ6",
        image_url: `${import.meta.env.BASE_URL}cards/selly_at.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー:Selly (IGV)",
          family_id:"n9",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n26",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/selly_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },

        build_rule:{
          type:"require_leader",
          description:"リーダー:Selly (IGV)",
          family_id:"n9",
        },
    
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n27",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/leo_at.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー:LEO",
          family_id:"n10",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n28",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/leo_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー:LEO",
          family_id:"n10",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n29",
        name: "あああ6",
        image_url: `${import.meta.env.BASE_URL}cards/kohaku_at.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー:秋雪こはく",
          family_id:"n11",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n30",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/kohaku_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },

        build_rule:{
          type:"require_leader",
          description:"リーダー:秋雪こはく",
          family_id:"n11",
        },
    
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n31",
        name: "あああ6",
        image_url: `${import.meta.env.BASE_URL}cards/dtto_at.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー:dtto.",
          family_id:"n12",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n32",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/dtto_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },

        build_rule:{
          type:"require_leader",
          description:"リーダー:dtto.",
          family_id:"n12",
        },
    
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n33",
        name: "いいい",
        image_url: `${import.meta.env.BASE_URL}cards/haru_at.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー:渋谷ハル(IGV)",
          family_id:"n13",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n34",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/haru_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー:渋谷ハル(IGV)",
          family_id:"n13",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n35",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/sakura_at.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー:碧依さくら",
          family_id:"n14",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n36",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/sakura_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー:碧依さくら",
          family_id:"n14",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n37",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/kamito_at.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー:Kamito (IGV)",
          family_id:"n15",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n38",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/kamito_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー:Kamito (IGV)",
          family_id:"n15",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n39",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/tttcheekyttt_at.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー:tttcheekyttt",
          family_id:"n16",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n40",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/tttcheekyttt_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー:tttcheekyttt",
          family_id:"n16",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n41",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/q_at.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー:神成きゅび(IGV)",
          family_id:"n17",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n42",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/q_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー:神成きゅび(IGV)",
          family_id:"n17",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n43",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/ras_at.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー:Ras (IGV)",
          family_id:"n18",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n44",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/ras_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー:Ras (IGV)",
          family_id:"n18",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n45",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/noa_at.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー:胡桃のあ(IGV)",
          family_id:"n19",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n46",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/noa_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー:胡桃のあ(IGV)",
          family_id:"n19",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n47",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/cpt_at.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー:Cpt(IGV)",
          family_id:"n20",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n48",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/cpt_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー:Cpt(IGV)",
          family_id:"n20",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n49",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/zeder_at.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー:Zeder",
          family_id:"n21",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n50",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/zeder_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー:Zeder",
          family_id:"n21",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n51",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/kuroha_at.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー:Arya Kuroha",
          family_id:"n22",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n52",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/kuroha_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー:Arya Kuroha",
          family_id:"n22",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n53",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/hase_at.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー:ハセシン",
          family_id:"n23",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n54",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/hase_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー::ハセシン",
          family_id:"n23",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n55",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/sumire_at.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー:花芽すみれ(IGV)",
          family_id:"n24",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n56",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/sumire_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー::花芽すみれ(IGV)",
          family_id:"n24",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },


      /********************************
        * タクティクス
      ********************************/

      {
        id: "n57",
        name: "電磁スモーク",
        image_url: `${import.meta.env.BASE_URL}cards/tc_d.png`,
    
        card_type: {
          internal_id: "tactics",
          display_name: "タクティクス",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n58",
        name: "名誉のバッチ",
        image_url: `${import.meta.env.BASE_URL}cards/tc_m.png`,
    
        card_type: {
          internal_id: "tactics",
          display_name: "タクティクス",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n59",
        name: "復活ビーコン",
        image_url: `${import.meta.env.BASE_URL}cards/tc_h.png`,
    
        card_type: {
          internal_id: "tactics",
          display_name: "タクティクス",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n60",
        name: "フォールダウンシールド",
        image_url: `${import.meta.env.BASE_URL}cards/tc_f.png`,
    
        card_type: {
          internal_id: "tactics",
          display_name: "タクティクス",
        },

        tactics_type:"equipment",
        is_ace: false,
        is_local: true,
        is_new: true,
      },
  ];
  
  export default localCards;