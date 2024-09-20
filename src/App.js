import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SavingGame from './components/SavingGame';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <SavingGame />
      </div>
    </DndProvider>
  );
}

export default App;
