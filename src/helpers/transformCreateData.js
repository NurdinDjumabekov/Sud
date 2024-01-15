export const transformCreateData = (info, role, faceData) => {
  if (role === 1) {
    return {
      ...info?.todosApplications,
      plaintiff: [
        ...info?.todosApplications?.plaintiff,
        {
          ...faceData,
          action_type: 1,
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
        ...info?.todosApplications?.defendant,
        {
          ...faceData,
          action_type: 1,
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
        ...info?.todosApplications?.plaintiffResper,
        {
          ...faceData,
          action_type: 1,
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
        ...info?.todosApplications?.defendantResper,
        {
          ...faceData,
          action_type: 1,
          typeFace: info?.typeFace,
        },
      ],
      plaintiff: [],
      defendant: [],
      plaintiffResper: [],
    };
  }
};
