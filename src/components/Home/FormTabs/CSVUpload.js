import { Button } from '@chakra-ui/react';
import React, { useState } from 'react';

import {
  useCSVReader,
  lightenDarkenColor,
  formatFileSize,
} from 'react-papaparse';
import { BsFillCloudArrowUpFill} from "react-icons/bs"

import { useAuth } from 'contexts/AuthContext';

const GREY = '#CCC';
const DEFAULT_REMOVE_HOVER_COLOR = '#A01919';
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
  DEFAULT_REMOVE_HOVER_COLOR,
  40
);
const GREY_DIM = '#686868';

const styles = {
  zone: {
    alignItems: 'center',
    border: `2px dashed ${GREY}`,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    padding: 20,
    cursor: "pointer",
    backgroundColor: "#D3E5FE"
  },
  file: {
    background: 'linear-gradient(to bottom, #EEE, #DDD)',
    borderRadius: 20,
    display: 'flex',
    height: 120,
    width: 120,
    position: 'relative',
    zIndex: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  info: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
  },
  size: {
    borderRadius: 3,
    marginBottom: '0.5em',
    justifyContent: 'center',
    display: 'flex',
    color: "black"
  },
  name: {
    borderRadius: 3,
    fontSize: 12,
    marginBottom: '0.5em',
    color: "black"
  },
  progressBar: {
    bottom: 14,
    position: 'absolute',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  zoneHover: {
    borderColor: GREY_DIM,
  },
  default: {
    borderColor: GREY,
  },
  remove: {
    height: 23,
    position: 'absolute',
    right: 6,
    top: 6,
    width: 23,
  },
};

export default function CSVUpload() {

  const { CSVReader } = useCSVReader();
  const [zoneHover, setZoneHover] = useState(false);
  const [removeHoverColor, setRemoveHoverColor] = useState(
    DEFAULT_REMOVE_HOVER_COLOR
  );
  const { setAddresses, isPro } = useAuth()
  
  const handleUpload = (data) => {
    let _addressArr = []
    if(!isPro) {
      for(let i=0; i<data.length; i++) {
        if(data[i][0].length===42) {
          _addressArr.push(data[i][0])
        }
      }
    } else {
      for(let i=0; i<data.length; i++) {
        if(data[i][0].length===42) {
          _addressArr.push([data[i][0], data[i][1]])
        }
      }
    }
    setAddresses(_addressArr)
  }

  return (
    <CSVReader
      onUploadAccepted={(results) => {
        handleUpload(results["data"]);
        setZoneHover(false);
      }}
      onDragOver={(event) => {
        event.preventDefault();
        setZoneHover(true);
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        setZoneHover(false);
      }}
    >
      {({
        getRootProps,
        acceptedFile,
        ProgressBar,
        getRemoveFileProps,
        Remove,
      }) => (
        <>
          <div
            {...getRootProps()}
            style={Object.assign(
              {},
              styles.zone,
              zoneHover && styles.zoneHover
            )}
          >
            {acceptedFile ? (
              <>
                <div style={styles.file}>
                  <div style={styles.info}>
                    <span style={styles.name}>{acceptedFile.name}</span>
                    <span style={styles.size}>
                      {formatFileSize(acceptedFile.size)}
                    </span>
                  </div>
                  <div style={styles.progressBar}>
                    <ProgressBar />
                  </div>
                  <div
                    {...getRemoveFileProps()}
                    style={styles.remove}
                    onMouseOver={(event) => {
                      event.preventDefault();
                      setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
                    }}
                    onMouseOut={(event) => {
                      event.preventDefault();
                      setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                    }}
                  >
                    <Remove color={removeHoverColor} />
                  </div>
                </div>
              </>
            ) : (
              <>
                <p style={{color: "#2561ED"}}>
                  Drag the CSV file here to start uploading
                </p>
                <Button leftIcon={<BsFillCloudArrowUpFill size="25px"/>} bg="brand.200" 
                color="white" 
                _hover={{
                  backgroundColor: "brand.200"
                }}
                _focus={{
                  backgroundColor: "brand.200",
                  outline: "none"
                }}
                mt="4">Browse Files</Button>
              </>
            )}
          </div>
        </>
      )}
    </CSVReader>
  );
}