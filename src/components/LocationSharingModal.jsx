const LocationSharingModal = ({visible, onCancel, latitude, longitude}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.heading}>Location Coordinates</Text>

          <Text style={styles.subText}>
            Latitude: {latitude ?? 'Loading...'}
          </Text>
          <Text style={styles.subText}>
            Longitude: {longitude ?? 'Loading...'}
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onCancel}>
              <Text style={styles.cancel}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
