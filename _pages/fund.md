---
title: Fund my work
teaser: fund my work 💸
slug: fund
layout: default
---

<div class="qr">
  <img src="qr-bc1qa47tl4vmz8j82wdsdkmxex30r23c9ljs84fxah.png" onclick="copyAddress()" />
  <input readonly class="address" id="address" onclick="selectAddress()" value="bc1qa47tl4vmz8j82wdsdkmxex30r23c9ljs84fxah"/>
  <div class="copy-message" id="address-copied">🐨 Address copied!</div>
</div>

Hi, I'm **cloudhead**. I work on peer-to-peer and decentralized technologies.
My current focus is on creating a **high-quality privacy preserving Bitcoin
light-client in Rust**.

You can fund my work on [nakamoto][] by donating Bitcoin (₿) to the above
address. This will allow me to release more [work][] in the open. Donations go
towards my current area of focus.

## Donations received

Total: <strong id="total-usd">?</strong> (<span id="total-btc">?</span> BTC)

* `06.01.2023` 🙂  0.0005 BTC
* `26.03.2023` 🙂  0.0003 BTC
* `13.12.2022` 🙂  0.0006 BTC
* `08.09.2022` 🙂  0.0008 BTC
* `21.04.2022` 😃  0.0125 BTC
* `22.08.2021` 🙂  0.0009 BTC
* `20.06.2021` 😃  0.0300 BTC
* `12.03.2021` 🙂  0.0004 BTC
* `12.03.2021` 🙂  0.0003 BTC
* `24.01.2021` 🙂  0.0008 BTC
* `28.12.2020` 😃  0,0310 BTC
* `21.12.2020` 🙂  0,0005 BTC
* `15.10.2020` 🙂  0,0002 BTC
* `13.10.2020` 🙂  0,0004 BTC
* `06.10.2020` 🙂  0,0030 BTC
* `21.08.2020` 🙂  0,0020 BTC
* `16.08.2020` 🙂  0,0010 BTC
* `14.08.2020` 😃  0,0100 BTC

Beyond helping me finance some of these endeavors, donations are a way for me
to know that the work I'm doing is appreciated.

Thank you 💚

<script>
  function selectAddress() {
    var address = document.getElementById("address");
    address.select();
  }

  function copyAddress() {
    var address = document.getElementById("address");
    var msg = document.getElementById("address-copied");

    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(address.value).then(function () {
        msg.style.visibility = "visible";
      });
    }
  }

  Promise.all([
    fetch("https://mempool.space/api/address/bc1qa47tl4vmz8j82wdsdkmxex30r23c9ljs84fxah")
      .then(res => res.json())
      .then(data => data.chain_stats.funded_txo_sum),
    fetch("https://mempool.space/api/v1/prices")
      .then(res => res.json())
      .then(data => data.USD),
  ]).then(([donated, price]) => {
    document.getElementById("total-usd").innerHTML = "$" + ((donated * price) / 100000000).toFixed(2);
    document.getElementById("total-btc").innerHTML = (donated / 100000000).toFixed(2);
  });
</script>

[nakamoto]: https://github.com/cloudhead/nakamoto
[work]: https://github.com/cloudhead
[popol]: /popol
