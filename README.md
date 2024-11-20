## Overview 📰

This repository is designed to build a simple, user-friendly, and functional interface to interact with a blockchain network. . The app facilitates:
- Connect to Sui blockchain
- Make a transfer Sui token transaction
- Change the network (testnet - devnet)
- View transfer history

![933_1x_shots_so](https://github.com/user-attachments/assets/8500c9f1-38f2-4f54-b050-4d9265c23849)


## Technical
- Nextjs14
- Sui typescript SDK
- TailwindCss

## Blockchain Intergration

***Setup Providers***

![291_1x_shots_so](https://github.com/user-attachments/assets/4fa5ca34-54ea-452e-afb5-169958916146)



***Create and sign a transaction***

```typescript
 const handleSubmit = async () => {
        // Validate data
        if(!dataValidation()) return;
        // create new Transaction
        const tx = new Transaction();
        tx.setGasBudget(2000000);
        // split coin by the input amount  
        const [coin] = tx.splitCoins(tx.gas, [amount]);
        //transfer coin to receiver address
        tx.transferObjects([coin], address); 
        try{
        
            const { bytes, signature, reportTransactionEffects } = await signTransaction({
                transaction: tx,
                chain: `sui:${network}`,
            });
            const executeResult = await client.executeTransactionBlock({
                transactionBlock: bytes,
                signature
            });

            // create a toast to show the status off transaction
            toast.success(<span className="font-[500] text-[13px]"> Transaction Successfully! <a onClick={() => open(`https://${network}.suivision.xyz/txblock/${executeResult.digest}`)} className="underline text-secondary cursor-pointer">View Transaction</ a></span>);
//save transaction
handleSaveHistory(executeResult);
        } catch {
            toast.error('Transaction Failed');
        }
    }

```

## Get started

***Setup Project***
- Clone this repo:
  ```bash
   git clone https://github.com/phuquiivo03/blockchain-intergration.git
  ```
- Install dependencies (use --fore to overwrite the conflict code on Sui sdk):
  ```bash
   npm i --force
  ```
- Run project on your local:
   ```bash
  npm run dev
  ```

***Setup Wallet***
Install 2 of these wallets:
- [Sui wallet](https://chromewebstore.google.com/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil)
- [Suiet wallet](https://chromewebstore.google.com/detail/suiet-sui-wallet/khpkpbbcccdmmclmpigdgddabeilkdpd)

## How to use
***Connect wallet***

![image](https://github.com/user-attachments/assets/7b86b9bb-25ef-41d0-8c66-8ad8d748a234)

Click  on the connect button on the top right conner

![image](https://github.com/user-attachments/assets/0ad193aa-ea61-48ff-bdb6-0a2d637d2065)

This field show user some info: SUI Balance, Address, Client connect status. User can aslo swich network: 

![image](https://github.com/user-attachments/assets/f1a4a957-4c46-4fa9-af0c-9f38bda40e75)

***⚠️ Switch your wallet network***

You must switch your network on your wallet to make sure that the network (application and wallet) matching and the transaction will be sign successfull:
- On Sui Wallet: Click on the ⚙️ icon on the top right corner and change network.
- On Suiet: Click on network name on top right corner and change network

![62_1x_shots_so](https://github.com/user-attachments/assets/52d709fb-9482-4db8-9096-fd78e9eca39f)


***Transfer Token***

![image](https://github.com/user-attachments/assets/27b1b277-2072-4b3d-b486-3fc9cf1ec036)

1. Type receiver address and amount
2. Click Transfer
3. Sign transaction

A toast message will be display to show the transaction status:

![image](https://github.com/user-attachments/assets/f3b5832d-59c7-4462-b071-ff3bc9b8d662)

***View the transactions history***

![image](https://github.com/user-attachments/assets/4ead65a2-a583-4946-aee4-e09aa778842d)


## Licences

