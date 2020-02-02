import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import RelatorioGlobal from './RelatorioGlobal/RelatorioGlobal';
import FileSelectFrom from './FileSelectForm/FileSelectForm';
import ClienteRotaSelector from './ClienteRotaSelector/ClienteRotaSelector';
import RotaSelector from './RotaSelector/RotaSelector';
const Papa = require('papaparse');


function App() {
  const [file, setFile] = useState();
  const [fileData, setFileData] = useState();
  const [listClients, setListClientes] = useState();
  const [clienteRotaMap, setClienteRotaMap] = useState({});
  const [uniqueRoutes, setUniqueRoutes] = useState();
  const [selectedRoute, setSelectedRoute] = useState();
  const [relatorioGlobal, setRelatorioGlobal] = useState();
  const [appStateLevel, setAppStateLevel] = useState(1);

  const selectedRouteHandler = (event) => {
    setSelectedRoute(event.target.value);
  }

  // Handle file input
  const fileHandler = (event) => {
    setFile(event.target.files[0]);
  }

  // Handle file input form submit event
  const loadCsvHandler = (event) => {
    event.preventDefault();
    Papa.parse(file, {
      complete: (result) => {
        setFileData(result.data);
      }
    })
  }

  // Parse the fileData to get single clients list
  useEffect(() => {
    if (!fileData) {
      return;
    }
    let listaClientes = [...fileData].map((item) => item[5]);
    listaClientes = new Set(listaClientes);
    listaClientes.delete("Nome do contato");
    listaClientes.delete(undefined);
    listaClientes = Array.from(listaClientes);
    setListClientes(listaClientes);
    setAppStateLevel(2);
  }, [fileData]);


  const clienteRotaHandler = (event) => {
    event.preventDefault();
    setUniqueRoutes( [...new Set(Object.values(clienteRotaMap))] );
    setAppStateLevel(3);
  }

  // Updates the clientRotaMap
  const clientRotaMapHandler = (event) => {
    const cliente = event.target.name;
    const rota = event.target.value;
    setClienteRotaMap((oldState) => {
      const newState = {...oldState}
      newState[cliente] = rota
      return newState;
    });
  }

  const generateGlobalHandler = (event) => {
    event.preventDefault();
    console.log("EMPTY EGG CARTOON");
    generateGlobalData(selectedRoute);
  }

  const generateGlobalData = (route) => {
    console.log("fileData");
    console.log(fileData);
    console.log("clienteRotaMap");
    console.log(clienteRotaMap);

    const relatorioGlobal = {}

    for (let i =0; i<fileData.length; i++) {
      if (i === 0) {
        continue;
      }
      if (i === (fileData.length - 1)) {
        continue;
      }
      const contato = fileData[i][5];
      const descricao = fileData[i][19];
      const quantidade = Number(fileData[i][20].toString().replace(",00", ""));
      const codigo = fileData[i][26].toString();
      for (let key in clienteRotaMap) {
        if (contato.toString() === key.toString()) {
          if (clienteRotaMap[key] === route) {
            if (descricao in relatorioGlobal) {
              relatorioGlobal[descricao].quantidade += quantidade;
            } else {
              relatorioGlobal[descricao] = {
                codigo: undefined,
                quantidade: undefined
              }
              relatorioGlobal[descricao].codigo = codigo;
              relatorioGlobal[descricao].quantidade = quantidade;
            }
          }
        }
      }
      // passar tudo p um array
      const finalObjct = [];
      for (const key in relatorioGlobal) {
        const newObj = {
          nome: key,
          codigo: relatorioGlobal[key].codigo,
          quantidade: relatorioGlobal[key].quantidade
        }
        finalObjct.push(newObj);
      }

      finalObjct.sort((a, b) => {
        if (a.codigo > b.codigo) {
          return 1
        } else if (b.codigo > a.codigo) {
          return -1
        }
        return 0
      });
      setRelatorioGlobal(finalObjct);
      setAppStateLevel(4);
    }
  }
  useEffect(() => {
    console.log(relatorioGlobal)
  }, [relatorioGlobal])


  let whatItShouldRender;
  switch (appStateLevel) {
    case 2:
      whatItShouldRender = (
        <ClienteRotaSelector 
          onSubmit={clienteRotaHandler} 
          listaClientes={listClients}
          onChange={clientRotaMapHandler}
        />
      );
      break;
    case 3:
      whatItShouldRender = (
        <RotaSelector 
          onSubmit={generateGlobalHandler}
          onChange={selectedRouteHandler}
          routes={uniqueRoutes}
        />
      );
      break;
    case 4:
      whatItShouldRender = <RelatorioGlobal items={relatorioGlobal} />
      break;
    default:
      whatItShouldRender = (
        <FileSelectFrom onSubmit={loadCsvHandler} onChange={fileHandler} disabled={!file}/>
      )
  }

  return (
    <Container>
      {whatItShouldRender}
    </Container>
  );
}

export default App;
