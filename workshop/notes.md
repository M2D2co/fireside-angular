# chat.service.ts

## list()

```
    return this.db.collection<ChatRecord>('chats', ref  => ref.orderBy('timestamp', 'desc')).valueChanges().pipe(
      map(records => records.map(this.convertRecordToChat))
    );
```
## search(...)

```
    return this.http.get<ChatFromAPI[]>(url).pipe(
      map(chats => chats.map(
        chat => ({ ...chat, timestamp: new Date(chat.timestamp) })
      ))
    );
```

## saveChat(...)

```
    return this.db.collection<ChatRecord>('chats').add({
      contentText: typeof content === 'string' ? content : '',
      uid: user.uid,
      displayName: user.displayName,
      avatarURL: user.avatarUrl,
      timestamp: Timestamp.now(),
    }).then(ref => ref.id);
```

## post(...)

```
      // Upload the image
      const snapshot = await this.fs.upload(filePath, content);
      // Find the public download URL
      const imageUrl = await snapshot.ref.getDownloadURL();
      // Update the chat record with the image info
      this.db.doc(`/chats/${id}`).update({
        contentText: `User-provided image: ${content.name}`,
        contentImageURL: imageUrl,
      });
```

# core.module.ts

```
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
```

# login.component.html

```
  <firebase-ui
    (signInFailure)="handleError($event)"
  ></firebase-ui>
```

# auth.service.ts

## logout()

```
    return this.auth.signOut();
```

# search.function.ts

```
    const userRecord = await admin.auth().getUserByEmail(email);
    const snapshot = await admin.firestore().collection('chats')
      .where('uid', '==', userRecord.uid).orderBy('timestamp', 'desc').get();
    const chats: Chat[] = snapshot.docs.map(doc => doc.data() as ChatRecord).map(record => ({
      contentText: record.contentText,
      contentImageURL: record.contentImageURL,
      displayName: record.displayName,
      avatarURL: record.avatarURL,
      timestamp: record.timestamp.toDate(),
    }));
    response.status(200).send(chats);
```

# emoji.function.ts

```
    const chat = await snapshot.data() as Chat;

    if (chat.contentText) {
      console.log('Replacing lol with emoji on chat ' + context.params.chatId);
      chat.contentText = chat.contentText.replace(/lol|LOL/g, '😂');
      return snapshot.ref.update(chat);
    }
    return Promise.resolve();
```
