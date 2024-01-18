export const transformCreateData = (info, role, faceData) => {
  if (role === 1) {
    return {
      ...info?.todosApplications,
      plaintiff: [
        {
          ...faceData,
          typeFace: info?.typeFace,
        },
      ],
      defendant: [],
      plaintiffResper: [],
      defendantResper: [],
    };
  } else if (role === 2) {
    return {
      ...info?.todosApplications,
      defendant: [
        {
          ...faceData,
          typeFace: info?.typeFace,
        },
      ],
      plaintiff: [],
      plaintiffResper: [],
      defendantResper: [],
    };
  } else if (role === 3) {
    return {
      ...info?.todosApplications,
      plaintiffResper: [
        {
          ...faceData,
          typeFace: info?.typeFace,
        },
      ],
      plaintiff: [],
      defendant: [],
      defendantResper: [],
    };
  } else if (role === 4) {
    return {
      ...info?.todosApplications,
      defendantResper: [
        {
          ...faceData,
          typeFace: info?.typeFace,
        },
      ],
      plaintiff: [],
      defendant: [],
      plaintiffResper: [],
    };
  }
};
