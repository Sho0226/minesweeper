// import React from 'react';
// import styles from './index.module.css';

// const FullScreenButton: React.FC = () => {
//   const requestFullscreen = (elem: HTMLElement) => {
//     const method =
//       elem.requestFullscreen ||
//       elem.webkitRequestFullscreen ||
//       elem.mozRequestFullScreen ||
//       elem.msRequestFullscreen;
//     if (method) {
//       method.call(elem);
//     }
//   };

//   const openFullscreen = () => {
//     const elem = document.documentElement;
//     requestFullscreen(elem);
//   };

//   return (
//     <div
//       id="fullScreenButton"
//       onClick={openFullscreen}
//       style={{
//         display: 'inline-block',
//         padding: '10px',
//         backgroundColor: '#4CAF50',
//         color: 'white',
//         cursor: 'pointer',
//       }}
//     >
//       全画面表示にする
//     </div>
//   );
// };

// export default FullScreenButton;
